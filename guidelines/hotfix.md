## Correções rápidas em produção
- Caso seja necessário corrigir algo após deploy em `prod`:
- Criar branch a partir de `prod`
```sh
git checkout prod
git checkout -b fix-hotfix-login
```
- seguir todo o processo de desenvolvimento, exceto o fluxo de MR

## Merge Request
- Faça o merge request diretamente pra branch de `prod`
- Após merge, criar tag da versão:
```sh
git tag v0.1.X
git push origin v0.1.X
```
onde X é a versão do hotfix atual

`fix → prod → staging → prod`
