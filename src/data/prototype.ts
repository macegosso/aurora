import type { Scenario, KbEntry, TriageRules } from "./types";

export const SCENARIOS: Scenario[] = [
  {
    "id": "a_autismo_impacto",
    "benefit": "BPC — pessoa com deficiência (autismo)",
    "recommended": true,
    "persona": {
      "name": "Fernanda, mãe do João (7 anos, TEA nível 2)",
      "line": "Renda da família dentro do limite. Enviou só o laudo médico no pedido."
    },
    "outcomeType": "resolve",
    "stages": [
      "Capturar",
      "Prazo",
      "Traduzir",
      "Diagnosticar",
      "Provar",
      "Recurso",
      "Protocolar"
    ],
    "letter": {
      "text": "Indeferido. Da avaliação para fins de concessão de Benefício de Prestação Continuada à pessoa com deficiência, não restou caracterizado impedimento de longo prazo nos termos do art. 20, §2º, da Lei nº 8.742/1993.",
      "fields": {
        "beneficio": "BPC - PcD",
        "fundamento": "impedimento de longo prazo não caracterizado (art. 20, §2º)",
        "data_ciencia": "02/06/2026"
      }
    },
    "steps": [
      {
        "stageIndex": 0,
        "kicker": "Passo 1 — Capturar",
        "title": "A pessoa chega com a carta — e com medo",
        "chat": [
          {
            "who": "me",
            "t": "Boa tarde. Recebi uma carta do INSS negando o BPC do meu filho e não entendi nada."
          },
          {
            "who": "me",
            "doc": "carta_indeferimento.jpg",
            "sz": "foto"
          }
        ],
        "xray": {
          "seen": "Uma mãe recebeu uma negativa do INSS pelo benefício do filho com autismo. Não entende o motivo.",
          "ai": "A Aurora lê a foto da carta com visão computacional: identifica o tipo, o fundamento citado e a data.",
          "why": "Uma carta é texto livre, quase sempre uma foto torta. Não há formulário — ler isso é trabalho de IA, não de regras.",
          "chips": [
            {
              "t": "Entrada: foto + texto livre",
              "accent": true
            },
            {
              "t": "IA: visão / OCR"
            }
          ]
        },
        "internals": {
          "ocr": {
            "beneficio": "BPC - PcD",
            "fundamento_citado": "art. 20, §2º — impedimento de longo prazo não caracterizado",
            "data_ciencia": "02/06/2026"
          },
          "systems": [
            "WhatsApp/Blip",
            "Modelo de visão (OCR)"
          ]
        }
      },
      {
        "stageIndex": 1,
        "kicker": "Passo 2 — Ancorar o prazo",
        "title": "Antes de tudo, parar o relógio",
        "chat": [
          {
            "who": "them",
            "t": "Oi. Sinto muito — isso é muito angustiante. Duas coisas pra você respirar:"
          },
          {
            "who": "them",
            "t": "1) Essa negativa não é o fim — as de BPC por autismo estão entre as que mais se revertem.\n2) Mas o relógio começou: você tem até 02/07 para recorrer, de graça. Eu te lembro antes."
          }
        ],
        "xray": {
          "seen": "Antes de explicar, a Aurora acolhe e avisa do prazo — que a pessoa nem sabia que existia.",
          "ai": "Calcula o prazo legal (30 dias da ciência) e programa lembretes.",
          "why": "Muita gente perde o direito por perder o prazo. É a falha nº 1 — a primeira coisa a resolver.",
          "chips": [
            {
              "t": "Guard-rail: o prazo nunca fica só com a IA",
              "accent": true
            },
            {
              "t": "Ela lembra; a pessoa confirma"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "recurso_prazo"
          ],
          "deadline": {
            "ciencia": "02/06/2026",
            "prazo_final": "02/07/2026",
            "dias_restantes": 30
          },
          "guardrails": [
            {
              "check": "Prazo exposto no 1º contato",
              "status": "pass"
            },
            {
              "check": "Lembrete agendado",
              "status": "pass"
            }
          ]
        }
      },
      {
        "stageIndex": 2,
        "kicker": "Passo 3 — Traduzir",
        "title": "Traduzir o juridiquês para o português",
        "chat": [
          {
            "who": "them",
            "t": "Agora deixa eu te explicar a carta em português."
          },
          {
            "who": "them",
            "t": "O INSS negou na avaliação da deficiência, dizendo que 'não ficou caracterizado o impedimento de longo prazo'. Traduzindo: ele NÃO disse que seu filho não tem autismo. Disse que não enxergou o QUANTO o autismo afeta o dia a dia dele."
          }
        ],
        "xray": {
          "seen": "A carta é técnica e ameaçadora. A Aurora traduz — e a tradução muda o sentido da negativa.",
          "ai": "Recupera o artigo exato da lei (LOAS) numa base de normas verificada e usa isso para traduzir com precisão.",
          "why": "Aqui a falha é de comunicação, não de direito. Muitas vezes a pessoa TEM o direito — só não conseguia ler a instrução.",
          "chips": [
            {
              "t": "Fonte citada: LOAS, art. 20 §2º",
              "accent": true
            },
            {
              "t": "Toda afirmação jurídica tem fonte"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "impedimento_2anos",
            "biopsicossocial"
          ],
          "guardrails": [
            {
              "check": "Afirmação jurídica com fonte citada",
              "status": "pass"
            }
          ],
          "systems": [
            "Base normativa (RAG)"
          ]
        }
      },
      {
        "stageIndex": 3,
        "kicker": "Passo 4 — Diagnosticar",
        "title": "Diagnosticar e escolher o caminho",
        "chat": [
          {
            "who": "them",
            "t": "E aqui está o ponto: essa negativa costuma ter conserto. Quase sempre foi enviado só o laudo médico — e o laudo prova o diagnóstico, não o impacto. É essa lacuna que a gente preenche no recurso."
          }
        ],
        "xray": {
          "seen": "A Aurora avalia se a negativa tem chance de reversão e decide por onde seguir.",
          "ai": "Um classificador encaixa o caso em uma de três saídas. Aqui, com alta confiança: Resolver.",
          "why": "A Aurora não transforma todo caso em recurso. Ela faz triagem honesta — é o que constrói confiança.",
          "chips": [
            {
              "t": "Saída: Resolver",
              "accent": true
            },
            {
              "t": "As outras duas você vê no fim"
            }
          ]
        },
        "internals": {
          "triage": {
            "label": "Resolver (reversível, navegacional)",
            "confidence": 0.82,
            "signals": [
              "Fundamento = impacto não demonstrado",
              "Apenas laudo anexado",
              "Renda dentro do limite"
            ],
            "reasoning": "O motivo da negativa é a não-demonstração do impacto funcional, corrigível no recurso com a rotina do dia a dia. Não é ausência de direito."
          }
        }
      },
      {
        "stageIndex": 4,
        "kicker": "Passo 5 — Provar",
        "title": "Transformar a vida real em prova",
        "chat": [
          {
            "who": "them",
            "t": "Me dá exemplos do dia a dia: em que seu filho precisa de ajuda que outra criança de 7 anos normalmente já não precisaria?"
          },
          {
            "who": "me",
            "t": "Ele não se veste sozinho, não fala frases completas, e não pode ficar sozinho nem um minuto porque não tem noção de perigo — já tentou sair na rua."
          }
        ],
        "xray": {
          "seen": "A Aurora pede a rotina concreta. É aqui que mora a virada do caso.",
          "ai": "Traduz o relato da mãe para os critérios que a perícia avalia: 'não se veste' → autonomia; 'não fala frases' → comunicação; 'sem noção de perigo' → cognição e supervisão.",
          "why": "Este é o coração do 'por que IA'. Mapear o relato livre de uma mãe para os critérios técnicos da perícia é impossível de roteirizar.",
          "chips": [
            {
              "t": "Sem inventar nada — só traduzir o que ela vive",
              "accent": true
            },
            {
              "t": "É o que faltava na negativa"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "biopsicossocial"
          ],
          "generation": {
            "doc_type": "Mapa de impacto funcional",
            "excerpt": "Autocuidado: não realiza vestir-se de forma independente (atípico para a idade). Comunicação: linguagem verbal limitada, não estrutura frases completas. Cognição/segurança: ausência de percepção de risco, exige supervisão contínua.",
            "citations": [
              "biopsicossocial"
            ]
          },
          "guardrails": [
            {
              "check": "Nenhum fato inventado (só reorganização do relato)",
              "status": "pass"
            }
          ]
        }
      },
      {
        "stageIndex": 5,
        "kicker": "Passo 6 — Montar o recurso",
        "title": "Montar o recurso — com a pessoa no controle",
        "chat": [
          {
            "who": "them",
            "t": "Pronto. Montei seu recurso citando a lei do BPC e organizando a rotina do seu filho como prova do impacto. Antes de qualquer coisa, leia e me diga se está tudo verdadeiro — nada vai pro INSS sem você concordar."
          },
          {
            "who": "them",
            "doc": "recurso_administrativo.pdf",
            "sz": "documento"
          }
        ],
        "xray": {
          "seen": "A Aurora entrega o recurso pronto e pede revisão antes de seguir.",
          "ai": "Geração de texto ancorada nas normas: cada afirmação jurídica vem com a fonte.",
          "why": "Numa decisão de subsistência, errar é grave. Por isso a pessoa sempre revisa e confirma antes de qualquer passo irreversível.",
          "chips": [
            {
              "t": "Guard-rail: revisão humana obrigatória",
              "accent": true
            }
          ]
        },
        "internals": {
          "generation": {
            "doc_type": "Recurso administrativo (peça)",
            "excerpt": "Requer-se a reforma da decisão de indeferimento. O laudo comprova o diagnóstico (TEA nível 2); o impedimento de longo prazo (≥2 anos, art. 20 §10) caracteriza-se pelo impacto funcional descrito: dependência em autocuidado, comunicação limitada e necessidade de supervisão contínua por ausência de percepção de risco (art. 20 §6º — avaliação biopsicossocial).",
            "citations": [
              "impedimento_2anos",
              "biopsicossocial",
              "bpc_publico"
            ]
          },
          "guardrails": [
            {
              "check": "Toda afirmação rastreia a uma norma citada",
              "status": "pass"
            },
            {
              "check": "Revisão humana exigida antes de protocolar",
              "status": "pass"
            },
            {
              "check": "Nenhuma ação irreversível sem confirmação",
              "status": "pass"
            }
          ]
        }
      },
      {
        "stageIndex": 6,
        "kicker": "Passo 7 — Protocolar",
        "title": "Protocolar — guiando, sem tomar o lugar dela",
        "chat": [
          {
            "who": "them",
            "t": "Agora te mostro, passo a passo, como enviar no Meu INSS. Você faz o envio — eu fico do seu lado em cada etapa. E te lembro do prazo."
          }
        ],
        "xray": {
          "seen": "A Aurora orienta o envio no canal oficial, mas quem aperta o botão é a pessoa.",
          "ai": "A Aurora não submete pela pessoa e nunca pede a senha do gov.br. Ela prepara; a pessoa age no Meu INSS.",
          "why": "Duas razões: a fronteira legal (orientar não é representar) e segurança — a senha do governo é uma linha vermelha.",
          "chips": [
            {
              "t": "Integração: handoff guiado",
              "accent": true
            },
            {
              "t": "A senha gov.br nunca toca a Aurora"
            }
          ]
        },
        "internals": {
          "systems": [
            "Handoff guiado (cidadão age no Meu INSS)"
          ],
          "guardrails": [
            {
              "check": "Aurora não submete em nome da pessoa",
              "status": "pass"
            },
            {
              "check": "Senha gov.br nunca solicitada",
              "status": "pass"
            }
          ],
          "deadline": {
            "ciencia": "02/06/2026",
            "prazo_final": "02/07/2026",
            "dias_restantes": 30
          }
        }
      }
    ],
    "ending": {
      "kind": "resolve",
      "headline": "Recurso pronto — e a pessoa no controle",
      "body": "O caso foi resolvido em autosserviço: a Aurora reenquadrou a prova e montou um recurso fundamentado, sem custo. A mãe revisa e protocola ela mesma no Meu INSS.",
      "artifact": {
        "title": "recurso_administrativo.pdf",
        "excerpt": "Peça fundamentada citando LOAS art. 20 (§2º, §6º, §10), reorganizando a rotina do João como prova do impacto funcional.",
        "citations": [
          "impedimento_2anos",
          "biopsicossocial",
          "bpc_publico"
        ]
      }
    }
  },
  {
    "id": "b_renda_despesas",
    "benefit": "BPC — pessoa com deficiência (paralisia cerebral)",
    "recommended": false,
    "persona": {
      "name": "Márcia, mãe do Lucas (paralisia cerebral)",
      "line": "Renda per capita ~R$ 933 (acima do limite), mas despesas mensais altas com terapias, fraldas, transporte e medicação."
    },
    "outcomeType": "route",
    "stages": [
      "Capturar",
      "Prazo",
      "Traduzir",
      "Diagnosticar",
      "Rotear"
    ],
    "letter": {
      "text": "Indeferido. A renda mensal bruta per capita do grupo familiar é superior a 1/4 do salário mínimo, não atendendo ao critério do art. 20, §3º, da Lei nº 8.742/1993.",
      "fields": {
        "beneficio": "BPC - PcD",
        "fundamento": "renda per capita superior a 1/4 do salário mínimo (art. 20, §3º)",
        "data_ciencia": "24/05/2026"
      }
    },
    "steps": [
      {
        "stageIndex": 0,
        "kicker": "Passo 1 — Capturar",
        "title": "Negada por renda — mas a conta não fecha com a realidade",
        "chat": [
          {
            "who": "me",
            "t": "Oi. O INSS negou o BPC do meu filho Lucas, ele tem paralisia cerebral. Diz que a gente ganha demais, mas eu mal dou conta das contas dele."
          },
          {
            "who": "me",
            "doc": "carta_indeferimento.jpg",
            "sz": "foto"
          }
        ],
        "xray": {
          "seen": "Márcia recebeu uma negativa por renda — mas a renda formal não conta a história inteira do gasto com a deficiência.",
          "ai": "A Aurora lê a carta e identifica que, neste caso, o motivo é a renda, não a deficiência.",
          "why": "O mesmo fluxo lê qualquer carta; é o motivo da negativa que decide o caminho daqui pra frente.",
          "chips": [
            {
              "t": "Entrada: foto + texto livre",
              "accent": true
            },
            {
              "t": "IA: visão / OCR"
            }
          ]
        },
        "internals": {
          "ocr": {
            "beneficio": "BPC - PcD",
            "fundamento_citado": "art. 20, §3º — renda per capita superior a 1/4 do salário mínimo",
            "data_ciencia": "24/05/2026"
          },
          "systems": [
            "WhatsApp/Blip",
            "Modelo de visão (OCR)"
          ]
        }
      },
      {
        "stageIndex": 1,
        "kicker": "Passo 2 — Ancorar o prazo",
        "title": "O relógio corre — em qualquer saída",
        "chat": [
          {
            "who": "them",
            "t": "Que situação difícil, Márcia. Antes de tudo, o prazo: a carta é de 24/05, então você tem até 23/06 para reagir. Não deixe esse prazo passar — eu te lembro antes."
          }
        ],
        "xray": {
          "seen": "Mesmo nos casos que tendem à Justiça, o prazo administrativo de 30 dias continua valendo.",
          "ai": "Calcula o prazo a partir da ciência e agenda lembretes.",
          "why": "Perder o prazo fecha portas. A urgência vem primeiro, qualquer que seja a saída.",
          "chips": [
            {
              "t": "Guard-rail: o prazo nunca fica só com a IA",
              "accent": true
            },
            {
              "t": "Ela lembra; a pessoa confirma"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "recurso_prazo"
          ],
          "deadline": {
            "ciencia": "24/05/2026",
            "prazo_final": "23/06/2026",
            "dias_restantes": 7
          },
          "guardrails": [
            {
              "check": "Prazo exposto no 1º contato",
              "status": "pass"
            },
            {
              "check": "Lembrete agendado",
              "status": "pass"
            }
          ]
        }
      },
      {
        "stageIndex": 2,
        "kicker": "Passo 3 — Traduzir",
        "title": "'Renda acima do limite' não é o fim da linha",
        "chat": [
          {
            "who": "them",
            "t": "Deixa eu traduzir a carta. O INSS não discutiu a deficiência do Lucas — negou só pela renda: diz que a renda por pessoa da casa passou de R$ 405,25, o limite de 1/4 do salário mínimo."
          },
          {
            "who": "them",
            "t": "Mas tem um detalhe importante: esse limite de renda não é uma regra absoluta. Quando há gastos altos por causa da deficiência, dá pra mostrar que a vulnerabilidade é real."
          }
        ],
        "xray": {
          "seen": "A negativa por renda parece um beco sem saída — mas não é.",
          "ai": "Recupera o critério de renda e a posição do STF que o flexibiliza.",
          "why": "A pessoa precisa saber que 'renda acima do limite' não é o fim — há um caminho, e ele é específico.",
          "chips": [
            {
              "t": "Fonte: LOAS art. 20 §3º + STF Tema 173",
              "accent": true
            },
            {
              "t": "Toda afirmação jurídica tem fonte"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "bpc_renda",
            "renda_nao_absoluta"
          ],
          "guardrails": [
            {
              "check": "Afirmação jurídica com fonte citada",
              "status": "pass"
            }
          ],
          "systems": [
            "Base normativa (RAG)"
          ]
        }
      },
      {
        "stageIndex": 3,
        "kicker": "Passo 4 — Diagnosticar",
        "title": "Reconhecer o próprio limite",
        "chat": [
          {
            "who": "them",
            "t": "Me conta os gastos fixos do Lucas por mês: terapias, fraldas, transporte, remédios. Quero entender o tamanho real do esforço da família."
          },
          {
            "who": "me",
            "t": "Fisioterapia e fono toda semana, fralda geriátrica, transporte pras terapias e a medicação contínua. Sobra muito pouco no fim do mês."
          }
        ],
        "xray": {
          "seen": "A Aurora monta o quadro de despesas — é isso que muda o caso.",
          "ai": "Classifica o caso: como a renda formal está acima do limite, o caminho é a Justiça, onde as despesas pesam.",
          "why": "Aqui a Aurora é honesta sobre seus limites: este caso precisa de um advogado. Ela não promete o que não pode entregar sozinha.",
          "chips": [
            {
              "t": "Saída: Rotear",
              "accent": true
            },
            {
              "t": "A Aurora conhece o próprio limite"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "via_judicial"
          ],
          "triage": {
            "label": "Rotear (judicial)",
            "confidence": 0.74,
            "signals": [
              "Renda formal acima do limite",
              "Despesas extraordinárias com a deficiência presentes",
              "Mérito depende de flexibilização (STF Tema 173)"
            ],
            "reasoning": "A regra básica de renda não é atendida, mas a vulnerabilidade real pelas despesas costuma se ganhar na Justiça. Caso requer advogado."
          }
        }
      },
      {
        "stageIndex": 4,
        "kicker": "Passo 5 — Rotear",
        "title": "Encaminhar com o caso pronto — e preço claro",
        "chat": [
          {
            "who": "them",
            "t": "Organizei tudo num dossiê com seus gastos e a base legal, pronto pra um advogado. Vou te indicar um profissional verificado da nossa rede, com preço combinado antes — sem aquela história de levar 30% do seu benefício."
          },
          {
            "who": "them",
            "doc": "dossie_despesas.pdf",
            "sz": "documento"
          }
        ],
        "xray": {
          "seen": "A Aurora entrega o caso pré-montado a um advogado verificado, com preço transparente.",
          "ai": "Gera o dossiê de despesas e prepara o encaminhamento qualificado; a pessoa decide se segue.",
          "why": "O roteamento honesto é o oposto do intermediário predatório: só quando o caso precisa, com preço claro e sem obrigação.",
          "chips": [
            {
              "t": "Roteamento só quando o caso precisa de fato",
              "accent": true
            },
            {
              "t": "Preço transparente, sem compromisso"
            }
          ]
        },
        "internals": {
          "generation": {
            "doc_type": "Dossiê de despesas",
            "excerpt": "Quadro mensal de despesas extraordinárias com a deficiência (terapias, fraldas, transporte, medicação) para demonstrar vulnerabilidade real apesar da renda formal, nos termos do STF Tema 173.",
            "citations": [
              "renda_nao_absoluta",
              "via_judicial"
            ]
          },
          "guardrails": [
            {
              "check": "Roteamento apenas quando necessário",
              "status": "pass"
            },
            {
              "check": "Preço transparente informado",
              "status": "pass"
            },
            {
              "check": "Sem compromisso obrigatório",
              "status": "pass"
            }
          ],
          "systems": [
            "Rede de advogados verificados"
          ]
        }
      }
    ],
    "ending": {
      "kind": "route",
      "headline": "Encaminhado a um advogado — com o caso pronto",
      "body": "A Aurora não promete vitória; encaminha a um advogado verificado, com o dossiê de despesas pronto e preço transparente — sem entregar 30% do benefício pra qualquer um.",
      "artifact": {
        "title": "dossie_despesas.pdf",
        "excerpt": "Quadro de despesas extraordinárias com a deficiência, organizado para sustentar a flexibilização de renda na Justiça (STF Tema 173).",
        "citations": [
          "renda_nao_absoluta",
          "via_judicial"
        ]
      }
    }
  },
  {
    "id": "c_erro_calculo",
    "benefit": "BPC — idoso (65+)",
    "recommended": false,
    "persona": {
      "name": "Sr. Antônio (67), requerente do BPC idoso",
      "line": "Mora com a esposa (66), que já recebe BPC. O INSS somou o BPC da esposa na conta e indeferiu por renda."
    },
    "outcomeType": "resolve",
    "stages": [
      "Capturar",
      "Prazo",
      "Diagnosticar",
      "Recurso"
    ],
    "letter": {
      "text": "Indeferido. Apurada a renda mensal per capita do grupo familiar superior ao limite, considerada a renda dos demais integrantes do grupo familiar, nos termos do art. 20, §3º, da Lei nº 8.742/1993.",
      "fields": {
        "beneficio": "BPC - idoso",
        "fundamento": "renda per capita superior ao limite, considerada a renda dos demais integrantes do grupo familiar",
        "data_ciencia": "30/05/2026"
      }
    },
    "steps": [
      {
        "stageIndex": 0,
        "kicker": "Passo 1 — Capturar",
        "title": "Negado por uma renda que ele não reconhece",
        "chat": [
          {
            "who": "me",
            "t": "Boa tarde. Pedi o BPC porque tenho 67 anos e a renda aqui em casa é pouca. O INSS negou dizendo que ganho demais. Não entendo — só moro com a minha esposa."
          },
          {
            "who": "me",
            "doc": "carta_indeferimento.jpg",
            "sz": "foto"
          }
        ],
        "xray": {
          "seen": "Sr. Antônio foi negado por renda, mas não reconhece a renda que o INSS diz que ele tem.",
          "ai": "A Aurora lê a carta e extrai exatamente como o INSS montou a conta da renda familiar.",
          "why": "Quando o motivo é 'renda', o detalhe está em como a conta foi feita — e é aí que erros se escondem.",
          "chips": [
            {
              "t": "Entrada: foto + texto livre",
              "accent": true
            },
            {
              "t": "IA: visão / OCR"
            }
          ]
        },
        "internals": {
          "ocr": {
            "beneficio": "BPC - idoso",
            "fundamento_citado": "renda per capita superior ao limite, considerada a renda dos demais integrantes do grupo familiar",
            "data_ciencia": "30/05/2026"
          },
          "systems": [
            "WhatsApp/Blip",
            "Modelo de visão (OCR)"
          ]
        }
      },
      {
        "stageIndex": 1,
        "kicker": "Passo 2 — Ancorar o prazo",
        "title": "Primeiro, garantir o prazo",
        "chat": [
          {
            "who": "them",
            "t": "Sr. Antônio, primeiro o prazo: a decisão é de 30/05, então o senhor tem até 29/06 para recorrer, de graça e sem advogado. Eu cuido de te lembrar antes."
          }
        ],
        "xray": {
          "seen": "Antes de investigar o erro, a Aurora garante que o prazo não vai passar.",
          "ai": "Calcula o prazo da ciência e agenda os lembretes.",
          "why": "O prazo é a falha nº 1 — vem sempre primeiro, antes de qualquer diagnóstico.",
          "chips": [
            {
              "t": "Guard-rail: o prazo nunca fica só com a IA",
              "accent": true
            },
            {
              "t": "Gratuito, sem advogado"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "recurso_prazo"
          ],
          "deadline": {
            "ciencia": "30/05/2026",
            "prazo_final": "29/06/2026",
            "dias_restantes": 13
          },
          "guardrails": [
            {
              "check": "Prazo exposto no 1º contato",
              "status": "pass"
            },
            {
              "check": "Lembrete agendado",
              "status": "pass"
            }
          ]
        }
      },
      {
        "stageIndex": 2,
        "kicker": "Passo 3 — Diagnosticar",
        "title": "A Aurora pega o erro do próprio sistema",
        "chat": [
          {
            "who": "them",
            "t": "Achei o problema. O INSS somou na renda da família o BPC que a sua esposa já recebe. Mas a lei manda excluir da conta o BPC de outra pessoa da casa (art. 20, §14 da LOAS)."
          },
          {
            "who": "them",
            "t": "Ou seja: a conta do INSS está errada. Tirando o BPC da sua esposa, a renda por pessoa fica dentro do limite — e o senhor tem direito."
          }
        ],
        "xray": {
          "seen": "A Aurora compara a conta do INSS com o que a lei manda — e encontra um erro do próprio sistema.",
          "ai": "Recupera a regra das rendas excluídas e refaz o cálculo per capita.",
          "why": "Boa parte das negativas é erro de cálculo do próprio INSS. Achar isso devolve um direito sem precisar de tribunal.",
          "chips": [
            {
              "t": "A Aurora pegou o erro do próprio sistema",
              "accent": true
            },
            {
              "t": "Fonte: LOAS art. 20 §14"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "rendas_excluidas",
            "bpc_renda"
          ],
          "triage": {
            "label": "Resolver (erro do INSS)",
            "confidence": 0.9,
            "signals": [
              "Renda contabilizada inclui um BPC de outro membro",
              "Art. 20 §14 exclui esse valor do cálculo"
            ],
            "reasoning": "O INSS contabilizou indevidamente o BPC da esposa. Excluindo-o (art. 20 §14), a renda fica dentro do limite. Recurso aponta o erro."
          }
        }
      },
      {
        "stageIndex": 3,
        "kicker": "Passo 4 — Montar o recurso",
        "title": "Recurso com o recálculo, lado a lado",
        "chat": [
          {
            "who": "them",
            "t": "Montei o recurso com o recálculo lado a lado: como o INSS contou e como a lei manda contar. Leia e me diga se está tudo certo — nada vai pro INSS sem o senhor concordar."
          },
          {
            "who": "them",
            "doc": "recurso_administrativo.pdf",
            "sz": "documento"
          }
        ],
        "xray": {
          "seen": "A Aurora entrega o recurso com o erro apontado preto no branco.",
          "ai": "Gera a peça citando o art. 20 §14 e anexa o recálculo antes/depois.",
          "why": "Mostrar o erro de forma clara e fundamentada é o que faz o conselho reverter sem virar uma batalha.",
          "chips": [
            {
              "t": "Guard-rail: revisão humana obrigatória",
              "accent": true
            }
          ]
        },
        "internals": {
          "generation": {
            "doc_type": "Recurso administrativo (peça)",
            "excerpt": "Requer-se a reforma da decisão. Nos termos do art. 20, §14, da Lei 8.742/1993, o BPC recebido por integrante do grupo familiar não compõe a renda per capita. Recálculo: incluído indevidamente o BPC da esposa (R$ 1.621,00), a renda per capita resultou em R$ 810,50; excluído o valor conforme a lei, a renda per capita fica dentro do limite de R$ 405,25.",
            "citations": [
              "rendas_excluidas",
              "bpc_renda",
              "valores_2026"
            ]
          },
          "guardrails": [
            {
              "check": "Toda afirmação rastreia a uma norma citada",
              "status": "pass"
            },
            {
              "check": "Revisão humana exigida antes de protocolar",
              "status": "pass"
            },
            {
              "check": "Nenhuma ação irreversível sem confirmação",
              "status": "pass"
            }
          ]
        }
      }
    ],
    "ending": {
      "kind": "resolve",
      "headline": "Direito devolvido — corrigindo o erro do INSS",
      "body": "A Aurora pegou um erro de cálculo do próprio sistema: o INSS somou um BPC que a lei manda excluir. O recurso aponta o art. 20 §14 com o recálculo, e o Sr. Antônio protocola ele mesmo, sem custo.",
      "artifact": {
        "title": "recurso_administrativo.pdf",
        "excerpt": "Recálculo da renda per capita antes (R$ 810,50, com o BPC da esposa) e depois (dentro do limite, excluído o valor conforme art. 20 §14).",
        "citations": [
          "rendas_excluidas",
          "valores_2026"
        ]
      }
    }
  },
  {
    "id": "d_cadunico",
    "benefit": "BPC — pré-requisito (CadÚnico)",
    "recommended": false,
    "persona": {
      "name": "Dona Cleusa",
      "line": "CadÚnico atualizado pela última vez há 3 anos; pedido travado por isso."
    },
    "outcomeType": "cadunico",
    "stages": [
      "Capturar",
      "Diagnosticar",
      "Resolver o bloqueio"
    ],
    "letter": {
      "text": "Pendência no requerimento: inscrição no CadÚnico desatualizada. Regularize a inscrição no CRAS para prosseguir com o pedido.",
      "fields": {
        "beneficio": "BPC",
        "fundamento": "CadÚnico desatualizado (pré-requisito não cumprido)",
        "data_ciencia": "—"
      }
    },
    "steps": [
      {
        "stageIndex": 0,
        "kicker": "Passo 1 — Capturar",
        "title": "O pedido nem andou — travou numa pendência",
        "chat": [
          {
            "who": "me",
            "t": "Oi, filha. Tentei dar entrada no BPC mas não deixa concluir, aparece uma pendência e eu não entendo o que é. Tirei foto da tela."
          },
          {
            "who": "me",
            "doc": "tela_pendencia.jpg",
            "sz": "foto"
          }
        ],
        "xray": {
          "seen": "Dona Cleusa não foi negada — o pedido nem andou. Travou numa pendência que ela não entende.",
          "ai": "A Aurora lê a tela e identifica a pendência: o CadÚnico está desatualizado.",
          "why": "Às vezes o problema não é o mérito — é um pré-requisito invisível que trava tudo antes de começar.",
          "chips": [
            {
              "t": "Entrada: foto da tela",
              "accent": true
            },
            {
              "t": "IA: visão / OCR"
            }
          ]
        },
        "internals": {
          "ocr": {
            "tipo": "Pendência no requerimento",
            "pendencia": "CadÚnico desatualizado (última atualização há 3 anos)",
            "beneficio": "BPC"
          },
          "systems": [
            "WhatsApp/Blip",
            "Modelo de visão (OCR)"
          ]
        }
      },
      {
        "stageIndex": 1,
        "kicker": "Passo 2 — Diagnosticar",
        "title": "O pré-requisito invisível que ninguém explica",
        "chat": [
          {
            "who": "them",
            "t": "Já sei o que é. Para pedir o BPC, o seu CadÚnico — o Cadastro Único, aquele cadastro dos programas sociais — precisa estar atualizado há no máximo 2 anos. O seu está de 3 anos atrás, por isso travou."
          },
          {
            "who": "them",
            "t": "A boa notícia: isso tem solução simples, e não é no INSS. É no CRAS, o posto de assistência social do seu bairro."
          }
        ],
        "xray": {
          "seen": "A Aurora identifica que não adianta recorrer: falta um pré-requisito.",
          "ai": "Classifica como bloqueio de pré-requisito e recupera a regra do CadÚnico.",
          "why": "Mandar a pessoa recorrer aqui seria perder tempo. O honesto é resolver a causa real primeiro.",
          "chips": [
            {
              "t": "Saída: resolver o bloqueio antes",
              "accent": true
            },
            {
              "t": "Fonte: regra do CadÚnico"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "cadunico"
          ],
          "triage": {
            "label": "Bloqueio de pré-requisito",
            "confidence": 0.95,
            "signals": [
              "CadÚnico vencido (>24 meses)"
            ],
            "reasoning": "Não adianta recorrer no mérito antes de atualizar o CadÚnico. Pré-requisito invisível que trava tudo."
          }
        }
      },
      {
        "stageIndex": 2,
        "kicker": "Passo 3 — Resolver o bloqueio",
        "title": "O caminho concreto até o CRAS",
        "chat": [
          {
            "who": "them",
            "t": "Vou te explicar o caminho. Vá ao CRAS do seu bairro e peça para atualizar o CadÚnico. Leve documento com foto, CPF, comprovante de endereço e os dados de todo mundo que mora com você."
          },
          {
            "who": "them",
            "t": "Quando o CadÚnico estiver atualizado, a gente retoma o pedido do BPC de onde parou. Pode me chamar que eu te guio no resto."
          }
        ],
        "xray": {
          "seen": "A Aurora dá o passo a passo concreto para destravar — e se compromete a retomar depois.",
          "ai": "Monta a lista do que levar ao CRAS e orienta a sequência correta.",
          "why": "Explicar o pré-requisito invisível que ninguém explica é exatamente onde a assimetria de informação mais machuca.",
          "chips": [
            {
              "t": "Orientação prática, sem juridiquês",
              "accent": true
            },
            {
              "t": "A Aurora retoma depois"
            }
          ]
        },
        "internals": {
          "generation": {
            "doc_type": "Roteiro para o CRAS",
            "excerpt": "O que levar: documento oficial com foto, CPF, comprovante de residência e dados de todos os moradores da casa. Onde: CRAS do bairro. Depois: retomar o pedido do BPC com o CadÚnico atualizado.",
            "citations": [
              "cadunico"
            ]
          },
          "guardrails": [
            {
              "check": "Não recorrer sem resolver o pré-requisito",
              "status": "pass"
            },
            {
              "check": "Orientação em português claro",
              "status": "pass"
            }
          ],
          "systems": [
            "Agendador (retomar após o CRAS)"
          ]
        }
      }
    ],
    "ending": {
      "kind": "cadunico",
      "headline": "Destravando o pré-requisito invisível",
      "body": "A Aurora orienta ir ao CRAS atualizar o CadÚnico (o que levar, por quê) e só depois retomar o pedido. Demonstra o pré-requisito invisível que ninguém explica — e que sozinho trava milhares de pedidos.",
      "artifact": {
        "title": "roteiro_cras.pdf",
        "excerpt": "Lista do que levar ao CRAS para atualizar o CadÚnico e a ordem dos próximos passos até retomar o BPC.",
        "citations": [
          "cadunico"
        ]
      }
    }
  },
  {
    "id": "e_nao_honesto",
    "benefit": "BPC — pessoa com deficiência (dislalia leve)",
    "recommended": false,
    "persona": {
      "name": "Roberto, pai do Pedro (8)",
      "line": "Dislalia leve (troca de sons na fala), em acompanhamento. Renda per capita ~R$ 1.200, sem despesas extraordinárias relevantes."
    },
    "outcomeType": "honest_no",
    "stages": [
      "Capturar",
      "Diagnosticar",
      "A verdade"
    ],
    "letter": {
      "text": "Indeferido. Não caracterizado impedimento de longo prazo (art. 20, §2º) e renda mensal per capita superior ao limite (art. 20, §3º), nos termos da Lei nº 8.742/1993.",
      "fields": {
        "beneficio": "BPC - PcD",
        "fundamento": "não caracterizado impedimento de longo prazo; renda per capita superior ao limite",
        "data_ciencia": "05/06/2026"
      }
    },
    "steps": [
      {
        "stageIndex": 0,
        "kicker": "Passo 1 — Capturar",
        "title": "Um pai querendo recorrer — e merecendo a verdade",
        "chat": [
          {
            "who": "me",
            "t": "Olá. O INSS negou o BPC do meu filho Pedro, de 8 anos. Ele tem dislalia, troca alguns sons na fala e faz acompanhamento. Quero recorrer."
          },
          {
            "who": "me",
            "doc": "carta_indeferimento.jpg",
            "sz": "foto"
          }
        ],
        "xray": {
          "seen": "Roberto quer recorrer da negativa do filho. A pergunta honesta é: há base para isso?",
          "ai": "A Aurora lê a carta: a negativa cita tanto a deficiência quanto a renda.",
          "why": "Nem toda negativa tem conserto. Ler com cuidado antes de prometer é o começo da honestidade.",
          "chips": [
            {
              "t": "Entrada: foto + texto livre",
              "accent": true
            },
            {
              "t": "IA: visão / OCR"
            }
          ]
        },
        "internals": {
          "ocr": {
            "beneficio": "BPC - PcD",
            "fundamento_citado": "não caracterizado impedimento de longo prazo; renda per capita superior ao limite",
            "data_ciencia": "05/06/2026"
          },
          "systems": [
            "WhatsApp/Blip",
            "Modelo de visão (OCR)"
          ]
        }
      },
      {
        "stageIndex": 1,
        "kicker": "Passo 2 — Diagnosticar",
        "title": "Pesar os dois critérios — sem maquiar",
        "chat": [
          {
            "who": "them",
            "t": "Preciso ser honesta com você, Roberto, porque é o que eu gostaria que fizessem comigo. Olhei os dois pontos da negativa com cuidado."
          },
          {
            "who": "them",
            "t": "A dislalia leve, em acompanhamento, normalmente não configura o impedimento de longo prazo (de pelo menos 2 anos) que o BPC exige. E a renda da família está acima do limite, sem despesas extraordinárias que mudem a conta."
          }
        ],
        "xray": {
          "seen": "A Aurora avalia e chega a uma conclusão desconfortável: não há base sólida para reverter.",
          "ai": "Classifica o caso pesando os dois critérios — deficiência e renda — e a ausência de alavanca.",
          "why": "Esta é a saída mais difícil e a mais importante: dizer um 'não' honesto em vez de vender uma esperança falsa.",
          "chips": [
            {
              "t": "Saída: dizer a verdade",
              "accent": true
            },
            {
              "t": "O 'não' honesto é o fosso de confiança"
            }
          ]
        },
        "internals": {
          "retrieval": [
            "impedimento_2anos",
            "bpc_renda",
            "renda_nao_absoluta"
          ],
          "triage": {
            "label": "Sem direito (honesto)",
            "confidence": 0.8,
            "signals": [
              "Quadro leve, sem impedimento de longo prazo (≥2 anos)",
              "Renda acima do limite, sem despesas que mudem a conta"
            ],
            "reasoning": "O caso não atende nem ao critério de deficiência nem ao de renda, e não há despesas que flexibilizem. Recurso teria chance muito baixa."
          }
        }
      },
      {
        "stageIndex": 2,
        "kicker": "Passo 3 — A verdade",
        "title": "O 'não' honesto — e a proteção que vem junto",
        "chat": [
          {
            "who": "them",
            "t": "Por isso eu não vou montar um recurso sem base — seria te dar uma esperança falsa e te custar meses de espera por um 'não' de novo."
          },
          {
            "who": "them",
            "t": "Um aviso importante: pode aparecer alguém oferecendo entrar com esse caso cobrando por isso. Desconfie. E se o quadro do Pedro evoluir, ou as despesas mudarem, me chame que eu reavalio na hora."
          }
        ],
        "xray": {
          "seen": "A Aurora diz a verdade com cuidado — e ainda protege a pessoa de quem se aproveitaria dela.",
          "ai": "Comunica o 'não' em linguagem gentil, com a norma, e oferece um caminho futuro. Não gera recurso.",
          "why": "Vender um recurso fadado ao fracasso seria fácil e lucrativo. Não fazer isso é o que torna a Aurora confiável quando ela diz 'sim'.",
          "chips": [
            {
              "t": "Não dar falsa esperança",
              "accent": true
            },
            {
              "t": "Não monta recurso sem base"
            }
          ]
        },
        "internals": {
          "guardrails": [
            {
              "check": "Não dar falso 'sim' (falsa esperança)",
              "status": "pass"
            },
            {
              "check": "Nenhum recurso montado sem base",
              "status": "pass"
            },
            {
              "check": "Alerta sobre intermediário predatório",
              "status": "pass"
            },
            {
              "check": "Oferecida reavaliação futura",
              "status": "pass"
            }
          ],
          "systems": [
            "Base normativa (RAG)"
          ]
        }
      }
    ],
    "ending": {
      "kind": "honest_no",
      "headline": "Um 'não' honesto — o fosso de confiança",
      "body": "A Aurora diz a verdade, com a norma e em linguagem gentil; alerta que vai aparecer quem ofereça entrar com isso cobrando, e que seria falsa esperança; oferece reavaliar se o quadro evoluir. Não monta recurso sem base."
    }
  }
];

export const KNOWLEDGE_BASE: KbEntry[] = [
  {
    "id": "bpc_natureza",
    "topic": "Natureza do BPC",
    "rule": "Benefício assistencial (não previdenciário); não exige contribuição; não paga 13º nem gera pensão.",
    "source": "CF art. 203, V; Lei 8.742/1993 (LOAS) art. 20; Decreto 6.214/2007",
    "plain": "É um direito de quem precisa, não uma aposentadoria — não exige ter contribuído.",
    "volatile": false
  },
  {
    "id": "bpc_publico",
    "topic": "Quem tem direito",
    "rule": "Idoso com 65+ anos OU pessoa com deficiência com impedimento de longo prazo (mínimo 2 anos) que, com barreiras, obstrua a participação plena.",
    "source": "Lei 8.742/1993, art. 20",
    "plain": "Tem direito quem tem 65+ ou uma deficiência que dura pelo menos 2 anos e atrapalha a vida em sociedade.",
    "volatile": false
  },
  {
    "id": "bpc_renda",
    "topic": "Critério de renda",
    "rule": "Renda mensal per capita do grupo familiar igual ou inferior a 1/4 do salário mínimo (R$ 405,25 em 2026).",
    "source": "Lei 8.742/1993, art. 20, §3º; SM pelo Decreto 12.797/2025",
    "plain": "Soma a renda da casa, divide pelo nº de pessoas; até R$ 405,25 por pessoa passa nesse critério.",
    "volatile": true
  },
  {
    "id": "rendas_excluidas",
    "topic": "Rendas que não entram no cálculo",
    "rule": "Excluem-se: outro BPC recebido na família (art. 20 §14); Bolsa Família e transferências (art. 19-A); aposentadoria/benefício de até 1 SM de idoso, quando o requerente também é idoso (Súmula 415 STJ; Estatuto do Idoso art. 34).",
    "source": "Lei 8.742/1993; Lei 10.741/2003; Súmula 415 STJ",
    "plain": "Atenção: alguns valores NÃO contam na conta. Se o INSS somou um desses, ele errou.",
    "volatile": false
  },
  {
    "id": "renda_nao_absoluta",
    "topic": "O 1/4 não é absoluto",
    "rule": "O critério de 1/4 do SM não é absoluto; é possível comprovar vulnerabilidade por outros meios (ex.: despesas extraordinárias com a deficiência). A via judicial é mais flexível.",
    "source": "STF, Tema 173 (RE 567.985)",
    "plain": "Mesmo com renda um pouco acima, despesas altas com a deficiência podem mudar o quadro — e a Justiça costuma aceitar.",
    "volatile": false
  },
  {
    "id": "biopsicossocial",
    "topic": "Avaliação da deficiência",
    "rule": "A deficiência é comprovada por avaliação multiprofissional: perícia médica + avaliação social, que medem o impacto funcional e as barreiras — não apenas o diagnóstico.",
    "source": "Lei 8.742/1993, art. 20, §6º; Decreto 6.214/2007",
    "plain": "A perícia não avalia SE tem a condição — avalia o QUANTO ela afeta a vida. Por isso o laudo sozinho quase nunca basta.",
    "volatile": false
  },
  {
    "id": "impedimento_2anos",
    "topic": "Impedimento de longo prazo",
    "rule": "O impedimento deve ter duração mínima de 2 anos.",
    "source": "Lei 8.742/1993, art. 20, §10",
    "plain": "A deficiência precisa durar pelo menos 2 anos para caracterizar o direito.",
    "volatile": false
  },
  {
    "id": "cadunico",
    "topic": "CadÚnico (pré-requisito)",
    "rule": "Inscrição no Cadastro Único obrigatória, atualizada há no máximo 24 meses, feita no CRAS.",
    "source": "Decreto 6.214/2007; normas do CadÚnico (MDS)",
    "plain": "Antes de pedir, o CadÚnico precisa estar atualizado (máx. 2 anos), feito no CRAS. Vencido, trava o pedido.",
    "volatile": false
  },
  {
    "id": "valores_2026",
    "topic": "Valores de 2026",
    "rule": "Salário mínimo R$ 1.621,00; valor do BPC R$ 1.621,00 (1 SM); limite de renda per capita (1/4) R$ 405,25.",
    "source": "Decreto 12.797/2025",
    "plain": "Em 2026: salário mínimo e BPC = R$ 1.621; um quarto = R$ 405,25.",
    "volatile": true
  },
  {
    "id": "recurso_prazo",
    "topic": "Prazo do recurso",
    "rule": "30 dias corridos a partir da ciência da decisão; fora do prazo, é intempestivo e indeferido sem análise de mérito. Gratuito, sem advogado, pelo Meu INSS; permite juntar novos documentos.",
    "source": "Decreto 3.048/99; IN INSS 128/2022",
    "plain": "Negou? Você tem 30 dias para recorrer de graça, sem advogado, e pode anexar documentos novos.",
    "volatile": false
  },
  {
    "id": "recurso_orgao",
    "topic": "Quem julga o recurso",
    "rule": "O CRPS (Conselho de Recursos da Previdência Social) é órgão autônomo — não faz parte do INSS. Duas instâncias: 29 Juntas de Recursos e 4 Câmaras de Julgamento.",
    "source": "Decreto 3.048/99; Regimento Interno do CRPS",
    "plain": "Quem julga o recurso é um conselho independente do INSS, feito para revisar os erros dele.",
    "volatile": false
  },
  {
    "id": "via_judicial",
    "topic": "Via judicial",
    "rule": "Esgotadas as instâncias administrativas (ou em casos de flexibilização de renda), cabe ação na Justiça Federal / Juizado Especial Federal.",
    "source": "legislação processual; STF Tema 173",
    "plain": "Se o recurso não resolver, ou se depende de provar vulnerabilidade pelas despesas, o caminho é a Justiça.",
    "volatile": false
  }
];

export const TRIAGE_RULES: TriageRules = {
  "summary": "A Aurora classifica cada caso em uma de quatro situações, com um nível de confiança. Abaixo do limiar, escala para um humano.",
  "rules": [
    {
      "outcome": "Resolver",
      "when": "Negativa por motivo navegacional/corrigível (impacto não demonstrado, documento faltando, erro de cálculo do INSS) E há base para reverter.",
      "action": "Reenquadra a prova e monta o recurso administrativo. A pessoa protocola."
    },
    {
      "outcome": "Rotear",
      "when": "O mérito depende da via judicial (ex.: renda acima do limite com despesas extraordinárias; flexibilização do STF Tema 173).",
      "action": "Encaminha a advogado verificado, com dossiê pronto e preço transparente."
    },
    {
      "outcome": "Dizer a verdade",
      "when": "O caso não atende aos critérios e não há alavanca (de renda ou de prova) que mude isso.",
      "action": "Comunica honestamente, com a norma e uma alternativa. Não monta recurso sem base."
    },
    {
      "outcome": "Bloqueio de pré-requisito",
      "when": "Falta um pré-requisito (ex.: CadÚnico vencido).",
      "action": "Orienta a resolver o pré-requisito (CRAS) antes de qualquer recurso."
    }
  ],
  "confidence_gate": "Quando a confiança da classificação fica abaixo do limiar, ou o caso é ambíguo/sensível, a Aurora escala para revisão humana em vez de chutar."
};
