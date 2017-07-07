#language: pt

Funcionalidade: Pesquisa no google

  Sou um desenvolvedor
  Eu quero encontrar repositórios do github pela pesquisa do Google

  Cenário: Pesquisando por Mindset Boas Práticas pelo Google
    Dado Que estou com a página do Google aberta
    Quando Eu estou digitando minha pesquisa "mindsetboaspraticas github" no Google
    E Eu estou pressionando a tecla "enter" no Google
    Então Eu deveria ver que o primeiro resultado do Google é "mindsetboaspraticas · GitHub"