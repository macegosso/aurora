import type { Slide } from "./types";

export const SLIDES: Slide[] = [
  {
    "kind": "cover",
    "sec": "AI Product Challenge · Blip",
    "title": "Aurora",
    "lead": "Dona Marlene trabalhou 40 anos. O INSS negou. Na fila, um homem de terno cobrou 30% para ajudar.",
    "note": "Um copiloto de IA no WhatsApp que devolve às pessoas o acesso ao que já é delas."
  },
  {
    "kind": "quote",
    "sec": "O problema, em uma pessoa",
    "title": "A cena",
    "lead": "Ela aceitou. Não por ingenuidade — por falta de escolha. Ela não entendia o sistema. Ele entendia.",
    "footnote": "A distância entre o que ela sabia e o que ele sabia é o negócio inteiro dele."
  },
  {
    "sec": "Problema · tamanho",
    "title": "O sistema nega 8 milhões de vezes por ano — e erra muito ao negar.",
    "stats": [
      {
        "big": "8 mi",
        "label": "pedidos negados em 2024 (~53% de negativa)"
      },
      {
        "big": "13,2%",
        "label": "das negativas manuais estão erradas"
      },
      {
        "big": "+800 mil",
        "label": "recursos represados na fila"
      }
    ],
    "note": "Negar errado não reduz fila: só move a pessoa para a fila do recurso.",
    "footnote": ""
  },
  {
    "sec": "Negócio · tamanho e modelo",
    "title": "R$ 8–15 bi/ano vazam da renda das pessoas para intermediários — esse é o valor a redistribuir.",
    "stats": [
      {
        "big": "R$ 8–15 bi",
        "label": "TAM/ano"
      },
      {
        "big": "R$ 3–7 bi",
        "label": "SAM/ano · a fração roteável"
      },
      {
        "big": "274 mil",
        "label": "SOM · BPC autismo, dobrou em 2 anos"
      }
    ],
    "note": "A economia não vem de % do benefício: vem de lead qualificado e canal B2B2C.",
    "footnote": ""
  },
  {
    "sec": "O problema",
    "title": "O que acontece com a Dona Marlene não é azar — é o desenho do sistema.",
    "lead": "Em cada etapa há um ponto onde a pessoa desiste, erra sem volta, ou é capturada.",
    "cards": [
      {
        "t": "A carta que ninguém lê",
        "d": "A negativa chega em juridiquês. A pessoa fica parada.",
        "accent": "coral"
      },
      {
        "t": "O prazo invisível",
        "d": "30 dias para responder algo que muitos nem percebem. O silêncio vira indeferimento.",
        "accent": "gold"
      },
      {
        "t": "A prova errada",
        "d": "No BPC, a família traz o laudo. O INSS quer o dia a dia e os gastos.",
        "accent": "teal"
      },
      {
        "t": "O CadÚnico que trava",
        "d": "Pré-requisito invisível no CRAS. Desatualizado, segura o pedido por meses.",
        "accent": "purple"
      }
    ],
    "note": "E no fim da fila, sempre, o intermediário que promete resolver — e cobra."
  },
  {
    "sec": "Problema · o intermediário",
    "title": "Onde a pessoa trava, alguém lucra. Cobra 30% — e nunca diz 'não vá'.",
    "cols": [
      {
        "h": "O que ele faz",
        "items": [
          "Cobra 30% dos atrasados + parcelas, no mínimo social.",
          "Aceita o caso mesmo perdido: ganha por tentar, não por acertar."
        ]
      },
      {
        "h": "Por que vence hoje",
        "items": [
          "A Marlene é interceptada na porta da agência, não na App Store.",
          "Ele é a 'pessoa do lado' — só que trabalha contra ela."
        ]
      }
    ],
    "footnote": ""
  },
  {
    "sec": "Insight",
    "title": "A raiz não é falta de acesso. É falta de legibilidade — e agora ela é atacável em escala.",
    "cols": [
      {
        "h": "O acesso já existe",
        "items": [
          "Meu INSS, gov.br, 135: a porta está digitalizada.",
          "Falta entender o que está escrito do outro lado."
        ]
      },
      {
        "h": "Por que muda agora",
        "items": [
          "Traduzir norma para cada vida exigia um especialista por pessoa.",
          "Um modelo de linguagem faz isso em escala, a custo baixo."
        ]
      }
    ],
    "note": "Não é um problema novo. É um problema que só agora tem a ferramenta do tamanho dele."
  },
  {
    "sec": "Insight · por que agora",
    "title": "O Estado foi obrigado por lei a automatizar — e automatiza mal. A janela é abrir o outro lado.",
    "cols": [
      {
        "h": "O robô do Estado",
        "items": [
          "Fev/2026: a Dataprev desligou os mainframes do INSS.",
          "Lê só o CNIS e indefere na hora o que dependia de prova."
        ]
      },
      {
        "h": "O robô do cidadão",
        "items": [
          "O Estado pôs um robô para negar em 2 segundos lendo um campo.",
          "A resposta: um copiloto que lê a vida inteira e diz se a negativa foi indevida."
        ]
      }
    ],
    "footnote": "O Estado não está zerando a dor. Está fabricando dor, por lei, em escala. Isso é a janela."
  },
  {
    "kind": "cards",
    "sec": "Solução",
    "title": "Aurora não substitui o advogado. Faz a triagem honesta que ninguém faz hoje.",
    "lead": "Um copiloto de IA no WhatsApp. Diagnostica o caso e segue por uma de três saídas:",
    "cards": [
      {
        "t": "Resolver",
        "d": "Caso navegacional. Reenquadra a prova, monta o recurso de graça. A pessoa protocola.",
        "accent": "teal"
      },
      {
        "t": "Rotear",
        "d": "Caso judicial. Encaminha a advogado verificado, com dossiê pronto e preço transparente.",
        "accent": "coral"
      },
      {
        "t": "Dizer a verdade",
        "d": "Sem direito. Diz, com a norma na mão. O 'não' honesto que o intermediário não dá.",
        "accent": "gold"
      }
    ],
    "note": "Você percorre os cinco casos reais no protótipo navegável.",
    "cta": {
      "label": "Abrir o protótipo",
      "href": "#prototipo"
    }
  },
  {
    "sec": "Solução · por que IA",
    "title": "A régua: o problema tem que precisar de algo que só um LLM faz. O previdenciário tem as três.",
    "lead": "Sem isso, é workflow disfarçado.",
    "cols": [
      {
        "h": "Combinatório",
        "items": [
          "5 regras de transição em paralelo, renda com exceções legais."
        ]
      },
      {
        "h": "Dado sujo",
        "items": [
          "CNIS com buracos, foto torta, laudo. Ler a vida desorganizada de alguém real."
        ]
      }
    ],
    "note": "Onde um fluxo determinístico bastaria, a IA é decorativa. Aqui as três coisas acontecem ao mesmo tempo."
  },
  {
    "sec": "Solução · como a IA resolve",
    "title": "O mesmo passo, em três camadas — é isto que um formulário nunca faria.",
    "lead": "Fernanda recebe a negativa do BPC do filho com autismo. O passo decisivo é 'Provar':",
    "cols": [
      {
        "h": "O que ela vê",
        "items": [
          "'Me dá exemplos do dia a dia?' → 'Não se veste sozinho, não fala frases, não tem noção de perigo.'"
        ]
      },
      {
        "h": "O que a IA faz",
        "items": [
          "Traduz o relato para os critérios da perícia: autonomia, comunicação, supervisão."
        ]
      }
    ],
    "note": "A negativa do BPC raramente é falta de direito — é descompasso entre o laudo e o impacto funcional."
  },
  {
    "kind": "quote",
    "sec": "Solução · o diferencial defensável",
    "title": "O 'não' honesto é um fosso que o incumbente não pode copiar.",
    "lead": "O advogado de porta de agência nunca diz que você não tem direito. O modelo de negócio dele proíbe a honestidade.",
    "footnote": "Numa decisão sobre renda de subsistência, confiança é a moeda que manda. E a IA é paga por triar certo, não por empurrar serviço."
  },
  {
    "kind": "steps",
    "sec": "Solução · a máquina de confiança",
    "title": "Não é um chat. É um pipeline com a norma no centro e travas que não abrem exceção.",
    "steps": [
      "Ingestão multimodal",
      "Orquestração",
      "Grounding na norma (citação obrigatória)",
      "Triagem com confiança calibrada",
      "Geração do recurso citado",
      "Travas de segurança (P0 bloqueantes)",
      "Humano no loop"
    ],
    "note": "O fosso não é o LLM (commodity) — é a base normativa curada, os evals e a experiência de confiança.",
    "footnote": ""
  },
  {
    "kind": "cards",
    "sec": "Validação · de-risking",
    "title": "Não validei a ideia — testei o que pode derrubá-la, na ordem do impacto.",
    "lead": "As suposições mais arriscadas, ranqueadas por impacto. A primeira é decisiva:",
    "cards": [
      {
        "t": "1 · Distribuição",
        "d": "Alcançar baixa literacia digital a custo viável. O risco decisivo.",
        "accent": "coral"
      },
      {
        "t": "2 · Substituibilidade",
        "d": "Que fração dos casos a IA resolve sozinha. Se for fácil demais, o negócio não se sustenta.",
        "accent": "gold"
      },
      {
        "t": "3 · Confiança",
        "d": "A pessoa age sobre a orientação numa decisão vital? Sem ação, não há produto.",
        "accent": "teal"
      }
    ],
    "note": "A distribuição decide tudo — por isso a entrada é pelo autismo, onde a mãe já é digital e está em comunidades."
  },
  {
    "sec": "Validação · o método",
    "title": "Testar a experiência antes de escrever uma linha de código de produto.",
    "cols": [
      {
        "h": "Concierge / Wizard-of-Oz",
        "items": [
          "Especialistas simulam a Aurora com casos reais — orientação real e revisada.",
          "Mede comportamento, não opinião: a pessoa age? aceita a rota?"
        ]
      },
      {
        "h": "O que falsifica a tese",
        "items": [
          "Se menos de 30% dos casos forem navegáveis, a tese enfraquece.",
          "Sem ação ou pagamento, repensamos o negócio."
        ]
      }
    ],
    "note": "Confiança e adoção não se medem em survey — se medem vendo a pessoa agir sob risco real."
  },
  {
    "kind": "cards",
    "sec": "Negócio · os riscos de frente",
    "title": "Os riscos que assumo de frente — e a trava que impede o produto de trair a missão.",
    "cards": [
      {
        "t": "Distribuição",
        "d": "Desenhar para o ajudante (filho, CRAS, sindicato), não só para a beneficiária.",
        "accent": "coral"
      },
      {
        "t": "Virar gerador de leads",
        "d": "Contra-métrica: razão autosserviço:roteado. A qualidade da rede é o coração ético.",
        "accent": "gold"
      },
      {
        "t": "Dano irreversível",
        "d": "Nunca alucina norma, nunca perde prazo, nunca pede senha gov.br. Falha é bloqueante.",
        "accent": "teal"
      },
      {
        "t": "Fronteira da OAB",
        "d": "Orienta e prepara; o cidadão protocola. Informação não é representação.",
        "accent": "purple"
      }
    ],
    "note": "Trade-off central: começar estreito (1 benefício, 1 fluxo) para aprender rápido e com segurança."
  },
  {
    "sec": "Execução · por onde entrar",
    "title": "Entro pelo segmento onde se aprende mais barato — não pela vítima mais emblemática.",
    "cols": [
      {
        "h": "Norte ≠ porta de entrada",
        "items": [
          "Norte: a Dona Marlene — mais explorada, pior caso de distribuição.",
          "Entrada: BPC autismo — a mãe é digital, motivada, em comunidades."
        ]
      },
      {
        "h": "Now / Next / Later",
        "items": [
          "Agora: BPC autismo + grounding/evals + roteamento manual.",
          "Depois: aposentadoria + a Dona Marlene, pelo padrão-ajudante já aprendido."
        ]
      }
    ],
    "note": "A senha gov.br nunca toca a Aurora: o cidadão envia os documentos, a IA lê, o cidadão protocola."
  },
  {
    "kind": "proto",
    "sec": "Execução · a prova",
    "title": "Tudo isto já é navegável — uma prova de conceito da experiência e da mecânica de IA, lado a lado.",
    "lead": "Abra ao vivo: percorra o caso do autismo nas três camadas.",
    "cards": [
      {
        "t": "Três camadas",
        "d": "A experiência · o raio-X da IA · os dados por trás.",
        "accent": "coral"
      },
      {
        "t": "Cinco casos reais",
        "d": "Autismo · renda+despesas · erro do INSS · CadÚnico · o 'não' honesto.",
        "accent": "teal"
      },
      {
        "t": "Camada de dados",
        "d": "A base normativa, a triagem e as travas de segurança disparando.",
        "accent": "gold"
      }
    ],
    "cta": {
      "label": "Abrir o protótipo navegável",
      "href": "#prototipo"
    }
  },
  {
    "kind": "principles",
    "sec": "O pedido",
    "title": "Não peço o produto inteiro. Peço um piloto de um segmento, com um teste que autoriza — ou não — seguir.",
    "cards": [
      {
        "t": "O piloto",
        "d": "BPC autismo, 'recebi a negativa, e agora?'. Real: motor, grounding, triagem, travas.",
        "accent": "coral"
      },
      {
        "t": "O portão",
        "d": "O Concierge mede se o público age, se o desfecho melhora e se dá para monetizar sem extrair.",
        "accent": "teal"
      },
      {
        "t": "O que devolvo",
        "d": "Uma pessoa do lado dela que não cobra 30% e não mente. O acesso ao que já era dela.",
        "accent": "gold"
      }
    ],
    "footnote": "Ninguém deveria pagar 30% do próprio benefício para conseguir o que já é seu. A Aurora existe para acabar com essa conta."
  }
];
