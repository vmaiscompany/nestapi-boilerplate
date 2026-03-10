## Desenvolvimento
- Certifique-se que todas as features planejadas no backlog estejam concluidas
- validação funcional
- testes de integração
- testes manuais
- validação de quality assurance (QA)

## Pipeline de Staging
- Executar o pipeline para deploy em `staging`

## Problema encontrados
- Mapear problemas em histórias do backlog 
- Se o problema for grave não fazer processo de merge request com prod
- Caso o problema seja de pequeno impacto poderá seguir com o processo de merge request,desde que o problema esteja mapeado para a correção estrar em uma versão posterior.

## Merge Request
- Criar merge request para a branch de prod:
- ex: `staging-v0.1.0 → prod`
- Após merge, criar tag da versão:
```sh
git tag v0.1.0
git push origin v0.1.0
```
- Executar pipeline de deploy em `prod`
