import type { Slide, CV as CVData } from "./types";

export const SLIDES: Slide[] = [
  { kind:"cover", sec:"AI Product Challenge · Blip",
    title:"Aurora",
    lead:"A pessoa do lado de quem o sistema deixou pra trás.",
    note:"Um copiloto de IA, no WhatsApp, que devolve às pessoas o acesso ao que já é delas — começando pelo INSS." },

  { kind:"exec", sec:"A resposta primeiro", title:"Sumário executivo",
    cards:[
      {t:"Problema", d:"O INSS nega 8 milhões de pedidos/ano; ~13% das negativas manuais estão erradas. Quem não entende paga 30% do benefício a um intermediário — ou desiste do direito.", accent:"coral"},
      {t:"Raiz", d:"Não é falta de acesso (o Estado digitalizou). É assimetria de informação — e, pela primeira vez, ela é atacável em escala.", accent:"gold"},
      {t:"Solução", d:"Aurora: copiloto de IA que faz triagem honesta em 3 saídas — resolver · rotear · dizer a verdade.", accent:"teal"},
      {t:"Por que agora", d:"O Estado foi obrigado por lei a automatizar — e automatiza mal, fabricando negativa errada. Robô contra robô.", accent:"coral"},
      {t:"O pedido", d:"Um piloto de 1 segmento (BPC autismo), com um teste de validação que autoriza — ou não — construir.", accent:"teal"} ] },

  { kind:"quote", sec:"O problema, em uma pessoa", title:"A cena",
    lead:"Dona Marlene trabalhou 40 anos. O INSS negou sua aposentadoria. Na fila da agência, um homem de terno ofereceu ajuda — por 30% do que era dela.",
    note:"Ela aceitou. Não por ingenuidade — por falta de escolha. Ela não entendia o sistema. Ele entendia.",
    footnote:"Essa última frase é o negócio inteiro." },

  { sec:"Problema", title:"O sistema nega 8 milhões de vezes por ano — e errando muito.",
    stats:[
      {big:"8 mi", label:"pedidos negados em 2024 (de 15,3 mi · ~53% de negativa)"},
      {big:"13,2%", label:"das negativas manuais estão erradas (auditoria do TCU)"},
      {big:"+800 mil", label:"recursos represados — a fila cresceu 32%"} ],
    note:"O intermediário cobra 30% dos atrasados + 3 a 5 parcelas — de aposentados e pessoas com deficiência no mínimo social.",
    footnote:"Fontes: IBDP / Anuário da Justiça Federal · TCU via ConJur · CRPS" },

  { sec:"Problema", title:"A raiz é estrutural — e o momento é agora.",
    cols:[
      {h:"A raiz: assimetria de informação", items:[
        "O Estado já digitalizou o acesso (Meu INSS, gov.br). O que falta é legibilidade.",
        "O intermediário lucra da distância entre a sua situação e um emaranhado de regras.",
        "Fechar essa distância em escala era caro demais — até agora."]},
      {h:"Por que agora: robô contra robô", items:[
        "Fev/2026: a Dataprev desligou os mainframes do INSS (obrigação da LDO 2026/TCU).",
        "A automação é crua: o robô lê só o CNIS e nega na hora o que exige prova documental.",
        "O Estado colocou um robô para negar. A oportunidade é um robô do lado do cidadão."]} ] },

  { kind:"cards", sec:"Solução", title:"Aurora não substitui o advogado. Ela faz triagem honesta.",
    lead:"Um copiloto de IA, no WhatsApp. Diante de uma dúvida ou de uma negativa, diagnostica o caso e segue por uma de três saídas:",
    cards:[
      {t:"Resolver", d:"Caso navegacional: reenquadra a prova e monta o recurso, de graça. A pessoa protocola.", accent:"teal"},
      {t:"Rotear", d:"Caso judicial: encaminha a um advogado verificado, com dossiê pronto e preço transparente.", accent:"coral"},
      {t:"Dizer a verdade", d:"Sem direito: diz, com a norma e uma alternativa. O \u201cnão\u201d honesto.", accent:"gold"} ],
    note:"Navegável no protótipo — você percorre os cinco casos reais, passo a passo.",
    cta:{label:"Abrir o protótipo", href:"#prototipo"} },

  { sec:"Solução · profundidade de IA", title:"Um produto de IA, não uma \u201cfeature com ChatGPT plugado\u201d.",
    lead:"A régua: o problema precisa de algo que só um modelo de linguagem faz. O previdenciário tem as três coisas:",
    cols:[
      {h:"Combinatório", items:["5 regras de transição paralelas, renda com exceções legais. Otimização que nenhum leigo faz."]},
      {h:"Dados sujos", items:["CNIS com buracos, foto de carteira, laudo médico. Ler a vida desorganizada de alguém."]},
      {h:"Linguagem natural", items:["Traduzir juridiquês \u2194 português, nos dois sentidos."]} ],
    note:"Por isso recusei o mercado veicular: é determinístico (workflow resolve) e já foi vencido por Gringo/Zapay (R$ 400M). O previdenciário é onde a IA é necessária, não decorativa." },

  { kind:"quote", sec:"Solução · diferencial defensável", title:"O \u201cnão\u201d honesto é um fosso que o incumbente não pode copiar.",
    lead:"O advogado de porta de agência nunca te diz que você não tem direito — ele pega o caso e o seu dinheiro, mesmo perdido. O modelo de negócio dele proíbe a honestidade.",
    footnote:"Numa decisão sobre renda de subsistência, confiança é a moeda que manda. Um \u201cnão\u201d sem interesse por trás é o sinal de confiança mais forte que existe." },

  { kind:"steps", sec:"Solução · como a IA funciona por baixo", title:"Sob o capô: uma máquina de confiança, não um chat.",
    steps:["Ingestão multimodal","Orquestração","Grounding na norma (citação obrigatória)","Classificador de triagem (confiança calibrada)","Geração (recurso citado)","Guard-rails (P0 bloqueantes)","Humano no loop"],
    note:"Comprar o modelo, construir o produto. O moat não é o LLM (commodity) — é a base normativa, os evals e a UX de confiança.",
    footnote:"No protótipo, a camada \u201csob o capô\u201d mostra isto a cada passo: a norma recuperada, a confiança da triagem (.82, .74, .90, .95, .80), os guard-rails disparando." },

  { sec:"Solução · construção de produto", title:"O mesmo passo, em três camadas — é assim que a IA resolve.",
    lead:"Caso: Fernanda recebe a negativa do BPC do filho com autismo. O passo que vira o jogo (\u201cProvar\u201d):",
    cols:[
      {h:"A experiência (o que ela vê)", items:["\u201cMe dá exemplos do dia a dia em que ele precisa de ajuda?\u201d \u2192 \u201cEle não se veste sozinho, não fala frases completas, não tem noção de perigo.\u201d"]},
      {h:"O raio-X (o que a IA faz)", items:["Traduz o relato para os critérios da perícia: vestir \u2192 autonomia; frases \u2192 comunicação; perigo \u2192 cognição e supervisão."]},
      {h:"Os dados (sob o capô)", items:["Triagem = Resolver, confiança 0,82; norma citada: LOAS art. 20 §6º; guard-rail \u201cnenhum fato inventado\u201d \u2713."]} ],
    note:"Um formulário pediria \u201canexe o laudo\u201d. A IA transforma a vida real da criança em prova — que era o que faltava na negativa." },

  { kind:"cards", sec:"Validação", title:"Não validei a ideia — ataquei o que pode matá-la.",
    lead:"As suposições mais arriscadas, ranqueadas por impacto × incerteza:",
    cards:[
      {t:"1 · Distribuição", d:"Alcançar um público de baixa literacia digital a um custo viável. (o kill-shot)", accent:"coral"},
      {t:"2 · Substituibilidade", d:"Que fração dos casos é navegável o bastante para a IA resolver.", accent:"gold"},
      {t:"3 · Confiança", d:"A pessoa conta a vida e age sobre a orientação numa decisão vital?", accent:"teal"} ],
    note:"O kill-shot é distribuição — por isso a entrada é pelo autismo, onde a mãe é digital e motivada." },

  { sec:"Validação", title:"Testar a experiência antes do software.",
    cols:[
      {h:"O método: Concierge / Wizard-of-Oz", items:[
        "Humanos atrás da tela simulam a Aurora com casos reais, sem uma linha de código de produto.",
        "Mede comportamento, não opinião: a pessoa age? confia? aceita o roteamento? o desfecho melhora?"]},
      {h:"Critério de falsificação", items:[
        "Se <30% dos casos forem navegáveis \u2192 a tese enfraquece.",
        "Se ninguém age \u2192 repensar. Se ninguém paga/aceita rota \u2192 repensar o negócio.",
        "É o portão que autoriza construir. Sem passar, não escrevemos código."]} ] },

  { sec:"Validação · arquitetura de métricas", title:"A métrica-norte alinha negócio e missão — a contra-métrica impede a traição.",
    cols:[
      {h:"North Star", items:["R$ de benefício/atrasado devolvido a cidadãos por mês via Aurora."]},
      {h:"Árvore", items:["Input: taxa de ação, tempo até a 1ª ação.","Guardrail: violações P0 (meta 0), prazos perdidos.","Saída: benefícios garantidos, R$ devolvidos."]},
      {h:"Contra-métrica", items:["Razão autosserviço : roteado. Sem ela, o incentivo econômico empurraria tudo para o roteamento pago — virando um lead-gen mill."]} ] },

  { sec:"Estratégia & negócio", title:"R$ 8–15 bi/ano vazam da renda das pessoas para intermediários.",
    lead:"Esse é o valor a redistribuir. O tamanho não é \u201cmercado grande\u201d — é a conta:",
    stats:[
      {big:"R$ 8–15 bi", label:"TAM/ano · ~1 mi de concessões judiciais × honorário ~R$ 8–12 mil + camada administrativa"},
      {big:"R$ 3–7 bi", label:"SAM/ano · a fração navegável/roteável (30–50% dos casos)"},
      {big:"274 mil", label:"SOM · BPC autismo (dobrou em 2 anos), dentro de um BPC de 6,51 mi"} ],
    footnote:"Fontes: CNJ · IBDP · estimativas declaradas no PRD" },

  { sec:"Estratégia & negócio · modelo", title:"Monetizar sem virar o vilão.",
    lead:"Cobrar % do benefício replicaria o intermediário. Então a economia vem de outro lugar:",
    cards:[
      {t:"Marketplace de advogado", d:"Paga por lead qualificado, com dossiê pronto — mais barato que captar na porta da agência.", accent:"coral"},
      {t:"B2B2C", d:"Sindicatos, CRAS, cooperativas, empregadores. Canal alinhado e de confiança.", accent:"teal"},
      {t:"Fixo simbólico", d:"Em marcos de valor — jamais % do benefício de quem menos tem.", accent:"gold"} ],
    note:"A variável que importa não é a margem (já positiva: receita R$ 200–1.500 vs custo R$ 15–40) — é a taxa de conversão. É o que o Concierge mede. Incentivo alinhado: pago por triar certo." },

  { kind:"cards", sec:"Estratégia & negócio · trade-offs", title:"Os riscos que assumo de frente — porque é por eles que vale a pena.",
    cards:[
      {t:"Distribuição (kill-shot)", d:"Desenhar para o ajudante (o filho, o CRAS), não só para a beneficiária.", accent:"coral"},
      {t:"Dano irreversível", d:"Guard-rails P0; humano no loop; conservadorismo por padrão.", accent:"gold"},
      {t:"Fronteira da OAB", d:"Orienta e prepara; o cidadão protocola. Informação \u2260 representação.", accent:"teal"},
      {t:"Lead-gen mill", d:"Verificação rigorosa da rede = coração ético + a contra-métrica.", accent:"coral"} ],
    note:"Trade-off central: começar estreito (1 benefício, 1 fluxo), abrindo mão de cobertura, para aprender rápido e com segurança." },

  { sec:"Estratégia & negócio · priorização", title:"Entrar pelo segmento onde se aprende mais barato — não pela vítima mais emblemática.",
    cols:[
      {h:"Norte ≠ Cabeça-de-ponte", items:[
        "Norte: a Dona Marlene (quem o mercado mais explora) — mas o pior caso de distribuição.",
        "Cabeça-de-ponte: BPC autismo — a mãe é digital, motivada, em comunidades; o mecanismo de prova está no máximo."]},
      {h:"Now / Next / Later", items:[
        "Agora: BPC autismo (negativa) + grounding/evals + roteamento manual.",
        "Próximo: auxílio-doença + integração de dados.",
        "Depois: aposentadoria + Dona Marlene, via o padrão-ajudante já aprendido."]} ],
    note:"Não confundir o mercado final com o mercado de entrada — a distinção que mais separa um PM sênior de um júnior." },

  { sec:"Execução", title:"Um MVP estreito, com a disciplina que torna IA confiável.",
    cols:[
      {h:"O MVP", items:[
        "Segmento BPC autismo; fluxo carro-chefe \u201crecebi a negativa, e agora?\u201d.",
        "Real: motor conversacional, grounding citado, triagem, guard-rails.",
        "Mockado: integração Meu INSS/CNIS, rede de advogados."]},
      {h:"A disciplina (evals — o que nunca pode errar)", items:[
        "Nunca alucinar norma · nunca deixar o prazo de 30 dias passar.",
        "Nunca dar falso \u201csim\u201d/\u201cnão\u201d · nunca pedir a senha gov.br.",
        "Falha em qualquer um é bloqueante. Não tem \u201cquase\u201d."]} ] },

  { sec:"Execução · dependências", title:"A Aurora não depende de uma API que o governo não quer abrir.",
    lead:"O INSS resiste a compartilhar o CNIS de forma sistematizada, mesmo com outro ministério. Decisão de produto:",
    cols:[
      {h:"No MVP, sem integração direta", items:[
        "O cidadão envia os documentos; a IA lê; o cidadão protocola.",
        "A senha gov.br nunca toca a Aurora.",
        "O produto não fica refém de uma API que pode nunca existir."]},
      {h:"Bônus da cabeça-de-ponte", items:[
        "A mãe já é representante legal do filho — opera o Meu INSS por ele de forma legítima.",
        "O fluxo de upload e protocolo guiado é natural pra ela."]} ],
    note:"Transformar uma limitação real em vantagem (anti-fragilidade) é pensamento de sistema." },

  { kind:"proto", sec:"Execução · a prova", title:"Tudo isto já é navegável.",
    lead:"O protótipo não é mockup de tela — é a experiência e a mecânica de IA, lado a lado, para um avaliador entender o fluxo e o pensamento.",
    cards:[
      {t:"Três camadas", d:"A experiência · o raio-X · os dados por trás.", accent:"coral"},
      {t:"Cinco casos reais", d:"Autismo · renda+despesas · erro do INSS · CadÚnico · o \u201cnão\u201d honesto.", accent:"teal"},
      {t:"Camada de dados", d:"A base normativa, a lógica de triagem e os guard-rails.", accent:"gold"} ],
    cta:{label:"Abrir o protótipo navegável", href:"#prototipo"} },

  { kind:"principles", sec:"Fecho", title:"Aurora devolve às pessoas o acesso ao que já é delas.",
    cards:[
      {t:"Por que IA, não formulário", d:"Ler carta torta, relato livre, traduzir juridiquês, virar prova — só um modelo de linguagem faz.", accent:"coral"},
      {t:"O \u201cnão\u201d honesto como fosso", d:"O incumbente não pode copiar — o negócio dele proíbe.", accent:"teal"},
      {t:"Segurança em primeiro lugar", d:"Nunca alucina norma, nunca perde prazo, nunca a senha.", accent:"gold"},
      {t:"Integração honesta", d:"Não depende de uma API que o governo não quer abrir.", accent:"purple"} ],
    footnote:"Não uma feature com ChatGPT plugado — mas IA atacando a assimetria de informação que mantém milhões reféns de quem lucra com a confusão. Isso é pensar produto num mundo AI-first." }
];

/* ============================================================
   >>> EDITE AQUI: SEU CV E CONTATO <<<
   Troque os textos entre aspas pelos seus dados reais.
   (deixe vazio "" o que não quiser mostrar)
   ============================================================ */
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
