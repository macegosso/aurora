import type { Slide, CV as CVData } from "./types";

export const SLIDES: Slide[] = [
  {
    "kind": "cover",
    "sec": "AI Product Challenge · Blip",
    "title": "Aurora",
    "lead": "Dona Marlene trabalhou 40 anos. O INSS negou. Na fila, um homem de terno ofereceu ajuda — por 30% do que era dela.",
    "note": "Um copiloto de IA no WhatsApp que devolve às pessoas o acesso ao que já é delas. Esta é a história de por que ele precisa existir — e a do pedido vem no final."
  },
  {
    "kind": "quote",
    "sec": "O problema, em uma pessoa",
    "title": "A cena",
    "lead": "Ela aceitou. Não por ingenuidade — por falta de escolha. Ela não entendia o sistema. Ele entendia.",
    "footnote": "A distância entre o que ela sabia e o que ele sabia é onde mora o lucro dele. E é o negócio inteiro."
  },
  {
    "sec": "Problema · tamanho",
    "title": "O sistema nega 8 milhões de vezes por ano — e erra muito ao negar.",
    "stats": [
      {
        "big": "8 mi",
        "label": "pedidos negados em 2024 (de 15,3 mi · ~53% de negativa)"
      },
      {
        "big": "13,2%",
        "label": "das negativas manuais estão erradas (auditoria do TCU)"
      },
      {
        "big": "+800 mil",
        "label": "recursos represados — a fila de recursos cresceu 32%"
      }
    ],
    "note": "Negar errado não reduz fila: só transfere a pessoa da fila do pedido para a fila do recurso. A dor não diminui — ela se aprofunda.",
    "footnote": "Fontes: IBDP / Anuário da Justiça Federal · TCU via ConJur · CRPS"
  },
  {
    "sec": "O problema",
    "title": "O que acontece com a Dona Marlene não é azar — é o desenho do sistema.",
    "lead": "Cada etapa da jornada tem um ponto em que a pessoa desiste, erra sem volta, ou é capturada pelo intermediário:",
    "cards": [
      {
        "t": "A carta que ninguém lê",
        "d": "A negativa chega em juridiquês. A pessoa não sabe se foi erro dela, erro do INSS, ou falta de direito. Fica parada.",
        "accent": "coral"
      },
      {
        "t": "O prazo invisível",
        "d": "São 30 dias para responder uma exigência que muitos nem percebem que receberam. O silêncio vira indeferimento.",
        "accent": "gold"
      },
      {
        "t": "A prova errada",
        "d": "No BPC, a família traz o laudo — quando o INSS quer a narrativa do dia a dia e os gastos. O artefato certo nunca é apresentado.",
        "accent": "teal"
      },
      {
        "t": "O CadÚnico que trava",
        "d": "Um pré-requisito invisível, feito no CRAS, que precisa estar atualizado. Desatualizado, segura o pedido por meses.",
        "accent": "purple"
      }
    ],
    "note": "E no fim da fila, sempre, o intermediário que promete resolver — e cobra como se a confusão fosse trabalho dele."
  },
  {
    "sec": "Problema · o intermediário",
    "title": "Onde a pessoa trava, alguém lucra. Esse alguém cobra 30% — e nunca diz 'não vá'.",
    "cols": [
      {
        "h": "O que o intermediário faz",
        "items": [
          "Cobra 30% dos atrasados + 3 a 5 parcelas — de aposentados e pessoas com deficiência no mínimo social.",
          "Pega o caso mesmo perdido: fatura tentando, não acertando.",
          "Boa parte do que ele cobra como trabalho jurídico é navegação: ler a carta, responder a exigência, corrigir o CNIS."
        ]
      },
      {
        "h": "Por que ele vence hoje",
        "items": [
          "A Dona Marlene não navega na App Store — ela é interceptada na porta da agência.",
          "Fechar a distância entre a situação dela e as regras, em escala, sempre foi caro demais.",
          "Ele é a 'pessoa do lado' que ela pediu. Só que essa pessoa trabalha contra ela."
        ]
      }
    ],
    "footnote": "A pergunta de produto: como colocar uma pessoa do lado dela que não cobre 30% nem minta?"
  },
  {
    "sec": "Insight",
    "title": "A raiz não é falta de acesso. É falta de legibilidade — e pela primeira vez ela é atacável em escala.",
    "cols": [
      {
        "h": "O Estado já resolveu o acesso",
        "items": [
          "Meu INSS, gov.br, 135: o caminho de entrada está digitalizado.",
          "O que falta não é a porta — é entender o que está escrito do outro lado dela.",
          "As regras são públicas e conhecíveis. A barreira é aplicá-las a uma vida bagunçada."
        ]
      },
      {
        "h": "Por que isso muda agora",
        "items": [
          "Traduzir norma para a vida de alguém, caso a caso, exigia um especialista por pessoa.",
          "Um modelo de linguagem faz exatamente isso — em escala, a custo baixo.",
          "O recurso barato e bem-feito ataca direto a 'falsa redução de fila': 13% de negativas erradas têm remédio."
        ]
      }
    ],
    "note": "Não é um problema novo. É um problema que só agora tem uma ferramenta do tamanho dele."
  },
  {
    "sec": "Insight · por que agora",
    "title": "O Estado foi obrigado por lei a automatizar — e automatiza mal. A janela é abrir o outro lado.",
    "cols": [
      {
        "h": "O robô do Estado",
        "items": [
          "Fev/2026: a Dataprev desligou os mainframes do INSS (obrigação da LDO 2026 / TCU).",
          "Na maioria dos casos o robô lê só o CNIS e indefere na hora o que dependia de prova documental.",
          "Tempo rural, especial e de professor — que valem mais — são os que ele mais ignora e erra."
        ]
      },
      {
        "h": "O robô do cidadão",
        "items": [
          "O Estado pôs um robô para negar em 2 segundos lendo um campo.",
          "A resposta certa é um copiloto que lê a vida inteira da pessoa e diz se a negativa foi indevida.",
          "Enquadramento verdadeiro, datado e com fonte — difícil de copiar e impossível de ignorar."
        ]
      }
    ],
    "footnote": "O Estado não está zerando a dor. Está fabricando dor, por lei, em escala. Isso é a janela."
  },
  {
    "kind": "cards",
    "sec": "Solução",
    "title": "Aurora não substitui o advogado. Ela faz a triagem honesta que ninguém faz hoje.",
    "lead": "Um copiloto de IA no WhatsApp. Diante de uma dúvida ou de uma negativa, diagnostica o caso e segue por uma de três saídas:",
    "cards": [
      {
        "t": "Resolver",
        "d": "Caso navegacional — erro de CNIS com prova, documento faltante, exigência. Reenquadra a prova, monta o recurso de graça. A pessoa protocola.",
        "accent": "teal"
      },
      {
        "t": "Rotear",
        "d": "Caso probatório/judicial — rural, especial, incapacidade contestada. Encaminha a um advogado verificado, com dossiê pronto e preço transparente.",
        "accent": "coral"
      },
      {
        "t": "Dizer a verdade",
        "d": "Sem direito. Diz, com a norma na mão e uma alternativa. O 'não' honesto que o mercado predatório esconde.",
        "accent": "gold"
      }
    ],
    "note": "Você percorre os cinco casos reais, passo a passo, no protótipo navegável.",
    "cta": {
      "label": "Abrir o protótipo",
      "href": "#prototipo"
    }
  },
  {
    "sec": "Solução · por que IA",
    "title": "A régua: o problema tem que precisar de algo que só um modelo de linguagem faz. O previdenciário tem as três.",
    "lead": "Sem isso, é workflow disfarçado. O previdenciário passa na régua porque junta combinatório, dado sujo e linguagem natural:",
    "cols": [
      {
        "h": "Combinatório",
        "items": [
          "5 regras de transição em paralelo, renda com exceções legais. Otimização que nenhum formulário resolve sozinho."
        ]
      },
      {
        "h": "Dado sujo",
        "items": [
          "CNIS com buracos, foto de carteira torta, laudo médico. Ler a vida desorganizada de uma pessoa real."
        ]
      },
      {
        "h": "Linguagem natural",
        "items": [
          "Traduzir juridiquês para português e o relato de vida para critério de perícia — nos dois sentidos."
        ]
      }
    ],
    "note": "Por isso recusei o mercado veicular: é determinístico (workflow basta) e já foi vencido por Gringo/Zapay. Produto é tanto o que se escolhe quanto o que se recusa."
  },
  {
    "sec": "Solução · como a IA resolve",
    "title": "O mesmo passo, em três camadas — é isto que um formulário nunca faria.",
    "lead": "Caso: Fernanda recebe a negativa do BPC do filho com autismo. O passo que vira o jogo é 'Provar':",
    "cols": [
      {
        "h": "O que ela vê",
        "items": [
          "'Me dá exemplos do dia a dia em que ele precisa de ajuda?' → 'Não se veste sozinho, não fala frases completas, não tem noção de perigo.'"
        ]
      },
      {
        "h": "O que a IA faz",
        "items": [
          "Traduz o relato para os critérios da perícia: vestir → autonomia; frases → comunicação; perigo → cognição e supervisão."
        ]
      },
      {
        "h": "Os dados por trás",
        "items": [
          "Triagem = Resolver, confiança 0,82; norma citada: LOAS art. 20 §6º; checagem 'nenhum fato inventado' ✓."
        ]
      }
    ],
    "note": "A negativa do BPC quase nunca é por falta de direito — é descompasso entre o que a família traz (o diagnóstico) e o que a perícia avalia (o impacto funcional). A IA transforma a vida real da criança na prova que faltava."
  },
  {
    "kind": "quote",
    "sec": "Solução · o diferencial defensável",
    "title": "O 'não' honesto é um fosso que o incumbente não pode copiar.",
    "lead": "O advogado de porta de agência nunca te diz que você não tem direito. Ele pega o caso e o seu dinheiro, mesmo perdido. O modelo de negócio dele proíbe a honestidade.",
    "footnote": "Numa decisão sobre renda de subsistência, confiança é a moeda que manda. Um 'não' sem interesse por trás é o sinal de confiança mais forte que existe — e a IA é paga por triar certo, não por empurrar serviço."
  },
  {
    "kind": "steps",
    "sec": "Solução · a máquina de confiança",
    "title": "Não é um chat. É um pipeline com a norma no centro e travas que não negociam.",
    "steps": [
      "Ingestão multimodal",
      "Orquestração",
      "Grounding na norma (citação obrigatória)",
      "Triagem com confiança calibrada",
      "Geração do recurso citado",
      "Travas de segurança (P0 bloqueantes)",
      "Humano no loop"
    ],
    "note": "Comprar o modelo, construir o produto. O fosso não é o LLM (commodity) — é a base normativa curada, os testes de avaliação e a experiência de confiança.",
    "footnote": "No protótipo, cada passo abre a camada de dados: a norma recuperada, a confiança da triagem (.82, .74, .90, .95, .80) e as travas disparando."
  },
  {
    "kind": "cards",
    "sec": "Validação · de-risking",
    "title": "Não validei a ideia — ataquei o que pode matá-la, na ordem do que dói mais.",
    "lead": "As suposições mais arriscadas, ranqueadas por impacto × incerteza. A primeira é fatal:",
    "cards": [
      {
        "t": "1 · Distribuição",
        "d": "Alcançar um público de baixa literacia digital a um custo viável. É o risco fatal — a Marlene é interceptada fisicamente, não na App Store.",
        "accent": "coral"
      },
      {
        "t": "2 · Substituibilidade",
        "d": "Que fração dos casos é navegável o bastante para a IA resolver sozinha. Se for cauda fácil demais, o negócio não fecha.",
        "accent": "gold"
      },
      {
        "t": "3 · Confiança",
        "d": "A pessoa conta a vida e age sobre a orientação numa decisão vital? Sem ação, não há produto.",
        "accent": "teal"
      }
    ],
    "note": "A distribuição é o risco que decide tudo — por isso a entrada é pelo autismo, onde a mãe já é digital, motivada e está em comunidades."
  },
  {
    "sec": "Validação · o método",
    "title": "Testar a experiência antes de escrever uma linha de código de produto.",
    "cols": [
      {
        "h": "Concierge / Wizard-of-Oz no WhatsApp",
        "items": [
          "Especialistas atrás da tela simulam a Aurora com casos reais — orientação real e revisada, nunca um teste que deixa a pessoa pior.",
          "Mede comportamento, não opinião: a pessoa conta a vida? age? aceita o roteamento? o desfecho melhora?",
          "Os transcripts reais viram a especificação e os primeiros testes de avaliação do agente."
        ]
      },
      {
        "h": "Os critérios que falsificam a tese",
        "items": [
          "Se <30% dos casos forem navegáveis → a tese enfraquece.",
          "Se ninguém age → repensar. Se ninguém paga nem aceita rota → repensar o negócio.",
          "Este é o portão que autoriza construir. Sem passar, não escrevemos código."
        ]
      }
    ],
    "note": "Confiança e adoção não se medem em survey — se medem vendo a pessoa agir, ou não, sob risco real."
  },
  {
    "sec": "Negócio · tamanho e modelo",
    "title": "R$ 8–15 bi/ano vazam da renda das pessoas para intermediários. Esse é o valor a redistribuir — sem virar o vilão.",
    "stats": [
      {
        "big": "R$ 8–15 bi",
        "label": "TAM/ano · ~1 mi de concessões judiciais × honorário ~R$ 8–12 mil + camada administrativa"
      },
      {
        "big": "R$ 3–7 bi",
        "label": "SAM/ano · a fração navegável e roteável (30–50% dos casos)"
      },
      {
        "big": "274 mil",
        "label": "SOM · BPC autismo (dobrou em 2 anos), dentro de um BPC de 6,51 mi"
      }
    ],
    "note": "Cobrar % do benefício replicaria o intermediário. A economia vem de outro lugar: lead qualificado para advogado verificado, canal B2B2C (sindicato, CRAS, empregador) e fixo simbólico em marcos de valor — jamais % de quem menos tem.",
    "footnote": "Margem já é positiva (receita R$ 200–1.500 vs custo R$ 15–40). A variável que importa é a conversão — e é ela que o Concierge mede."
  },
  {
    "kind": "cards",
    "sec": "Negócio · os riscos de frente",
    "title": "Os riscos que assumo na cara — e a trava que impede o produto de trair a missão.",
    "cards": [
      {
        "t": "Distribuição",
        "d": "Desenhar para o ajudante (o filho, a moça do CRAS, o sindicato), não só para a beneficiária. É o vetor que torna o alcance viável.",
        "accent": "coral"
      },
      {
        "t": "Virar lead-gen para predador",
        "d": "Contra-métrica: razão autosserviço:roteado. Sem ela, o incentivo econômico empurraria tudo para a rota paga. A qualidade da rede é o coração ético.",
        "accent": "gold"
      },
      {
        "t": "Dano irreversível",
        "d": "Nunca alucina norma, nunca deixa o prazo de 30 dias passar, nunca dá falso sim/não, nunca pede a senha gov.br. Falha em qualquer um é bloqueante.",
        "accent": "teal"
      },
      {
        "t": "Fronteira da OAB",
        "d": "Orienta e prepara; o cidadão protocola. Informação não é representação.",
        "accent": "purple"
      }
    ],
    "note": "Trade-off central: começar estreito (1 benefício, 1 fluxo), abrindo mão de cobertura, para aprender rápido e com segurança."
  },
  {
    "sec": "Execução · por onde entrar",
    "title": "Entro pelo segmento onde se aprende mais barato — não pela vítima mais emblemática.",
    "cols": [
      {
        "h": "Norte ≠ porta de entrada",
        "items": [
          "Norte: a Dona Marlene — quem o mercado mais explora, mas o pior caso de distribuição.",
          "Entrada: BPC autismo — a mãe é digital, motivada, está em comunidades, e o mecanismo de prova está no auge.",
          "Bônus: a mãe já é representante legal do filho — opera o Meu INSS por ele de forma legítima."
        ]
      },
      {
        "h": "Now / Next / Later",
        "items": [
          "Agora: BPC autismo (negativa) + grounding/evals + roteamento manual.",
          "Próximo: auxílio-doença + integração de dados.",
          "Depois: aposentadoria + a Dona Marlene, via o padrão-ajudante já aprendido."
        ]
      }
    ],
    "note": "A Aurora não depende de uma API que o governo não quer abrir: o cidadão envia os documentos, a IA lê, o cidadão protocola. A senha gov.br nunca toca a Aurora — o produto não fica refém de uma integração que pode nunca existir."
  },
  {
    "kind": "proto",
    "sec": "Execução · a prova",
    "title": "Tudo isto já é navegável — não é mockup de tela, é o produto e a mecânica de IA, lado a lado.",
    "lead": "Para um avaliador entender o fluxo e o raciocínio de uma vez. Abra ao vivo: percorra o caso do autismo nas três camadas.",
    "cards": [
      {
        "t": "Três camadas",
        "d": "A experiência (o que ela vê) · o raio-X (o que a IA faz) · os dados por trás.",
        "accent": "coral"
      },
      {
        "t": "Cinco casos reais",
        "d": "Autismo · renda+despesas · erro do INSS · CadÚnico travado · o 'não' honesto.",
        "accent": "teal"
      },
      {
        "t": "Camada de dados",
        "d": "A base normativa, a lógica de triagem e as travas de segurança disparando.",
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
    "title": "Não peço para construir o produto inteiro. Peço um piloto de um segmento, com um teste que autoriza — ou não — seguir.",
    "cards": [
      {
        "t": "O piloto",
        "d": "BPC autismo, fluxo 'recebi a negativa, e agora?'. Real: motor conversacional, grounding citado, triagem, travas. Mockado: integração com Meu INSS e a rede de advogados.",
        "accent": "coral"
      },
      {
        "t": "O portão",
        "d": "O Concierge mede se o público alcançável age, se o desfecho melhora, e se há como monetizar sem extrair do mais pobre. Os três aparecem, ou repensamos.",
        "accent": "teal"
      },
      {
        "t": "O que devolvo à Dona Marlene",
        "d": "Uma pessoa do lado dela que não cobra 30% e não mente. O acesso ao que já era dela.",
        "accent": "gold"
      }
    ],
    "footnote": "Ela não entendia o sistema, e ele entendia. A Aurora existe para inverter exatamente essa frase."
  }
];

export const CV: CVData = {
  name:      "Seu Nome Completo",
  role:      "Product Manager",
  tagline:   "Construindo produtos de IA com foco em impacto real.",
  location:  "Cidade, Brasil",
  email:     "seu.email@exemplo.com",
  phone:     "+55 (00) 00000-0000",
  linkedin:  "linkedin.com/in/seu-perfil",
  github:    "",            // opcional — ex.: "github.com/seu-usuario"
  website:   "",            // opcional
  summary:   "Resumo profissional em 2–3 frases: quem você é, sua especialidade em produto, e o tipo de problema que você gosta de resolver. Conecte com produto e IA.",

  experience: [
    { role:"Cargo", company:"Empresa", period:"2022 — hoje", points:[
      "Conquista ou responsabilidade com impacto mensurável (use número quando possível).",
      "Outra entrega relevante — foco em produto, descoberta, priorização ou dados." ] },
    { role:"Cargo anterior", company:"Empresa", period:"2019 — 2022", points:[
      "Conquista relevante.",
      "Outra conquista relevante." ] }
  ],

  skills: ["Product discovery","Estratégia de produto","Priorização","Métricas & dados","IA aplicada","Pesquisa com usuários"],

  education: [
    { course:"Curso / Formação", school:"Instituição", period:"Ano" }
  ],

  languages: ["Português (nativo)","Inglês (fluente)"]
};
