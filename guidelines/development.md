## Versionamento
certifique-se de estar na branch principal de desenvolvimento da nova versão :
```sh
git checkout dev-v0.1.0
git pull origin dev-v0.1.0
```

crie a branch de desenvolvimento baseado no backlog

- tipos `feature(feat:)`, `correção (fix:)`, `documentação (docs:)`, `manutenção (chore:)`, `testes (test:)`, `refatoração (refactor:)`
- padrão de nomenclatura de branch `tipo:ID-descricao`
como no exemplo:
```sh
git checkout -b feat-v0.1.0-estrutura-inicial
```

## Documentação
- crie o arquivo de documentação na pasta adequada ao tipo de modificação com o nome da branch:
- ex:
`docs/feat/v0.1.0-estrutura-inicial.md`
- documente cada ação tomada no desenvolvimento

## Desenvolvimento
- desenvolva fazendo commits adequados
- evite usar somente um commit para todo o montante de modificações.
- crie testes para cada caso de uso, funcionalidade, etc.
- documentar decisões técnicas num arquivo de ADR (Architecture Decision Record) em `docs/decisions`, sempre usando o nome do arquivo identico ao da branch de dev, ex: `docs/decisions/v0.1.0-estrutura-inicial.md`


## Boas práticas de desenvolvimento
- nomes de variavéis/funções/arquivos concisos e autoexplicativos
- evitar arquivos com muitas linhas (quebre a logica em varios arquivos)
- tentar manter cada arquivo com no máximo 100 linhas
- quando necessário comentários sucintos explicando uma parte especifica do código


## Boas práticas de commits
- Evite fazer apenas um commit grande.
- Prefira commits pequenos e claros.
- Evite mensagem de commits genéricas.
- Ex:
```sh
git commit -m 'feat: criar estrutura base da API'
git commit -m 'feat: adicionar controller de autenticação'
git commit -m 'test: testes para o controller de autenticação'
git commit -m 'fix: corrigir validação de email'
git commit -m 'docs: documentar feature v0.1.0-estrutura-inicial'
git commit -m 'merge: resolvido conflitos nos arquivos x,y,z'
```

## Abrir Merge Request
- Antes de abrir o merge request certifique-se de atualizar sua branch com o repositório remoto:
```sh
git checkout dev-v0.1.0
git pull origin dev-v0.1.0
git checkout feat-v0.1.0-estrutura-inicial
git rebase dev-v0.1.0
```
- resolva conflitos se existirem
- suba sua branch para o repositório remoto:
```sh
git push origin feat-v0.1.0-estrutura-inicial
```
- abra um merge request para a branch informada no backlog de acordo com a versão
- ex: `dev-v0.1.0`
- Utilize o template em `guidelines/pr-template.md` para criar a descrição da PR.