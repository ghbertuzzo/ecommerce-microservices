# Ecommerce Microservices

Este projeto implementa uma arquitetura de microsserviços com **NestJS**, utilizando **RabbitMQ** como broker de mensagens e **PostgreSQL** como banco de dados. Todos os serviços são orquestrados via **Docker Compose**.

## Arquitetura proposta

![Arquitetura Geral](imgs/arquitetura-ecommerce-git.jpg)

* A principal ideia foi isolar cada microserviço para funcionar de forma independente, com seu próprio banco de dados, sendo orquestrados pelo BFF.
* A imagem da arquitetura tem como objetivo refletir fielmente as configurações implementadas no código. Portanto, as strings de conexão, mensagens enviadas pelo RabbitMQ, nomes das filas e URLs dos serviços são reais, conforme definidos no ambiente de desenvolvimento (.env.dev).
* Embora os serviços principais (checkout, payments, expedition) estejam expostos diretamente via mapeamento de portas no `docker-compose`, e não estejam isolados em redes privadas ou específicas, isso foi feito apenas para facilitar testes e avaliação local. Em um ambiente de produção, apenas o serviço BFF estaria exposto à internet, enquanto os demais serviços permaneceriam restritos a uma rede interna. Essa decisão impacta outras estratégias de desenvolvimento, como as validações dos payloads e a escrita de testes unitários, que foram concentradas exclusivamente no BFF.

---

## Fluxo de execução

1 - Criação de novo pedido
* O serviço BFF é responsável por receber a requisição de um novo pedido, validar os dados e publicar a mensagem na fila para o serviço de checkout consumir.
* O serviço de checkout salva as informações relacionadas ao seu contexto e envia os dados restantes, acrescentando o ID do pedido gerado, para a fila do serviço de pagamento.
* O serviço de pagamento grava os dados no banco, processa o pagamento (de forma randômica: 50% aprovado / 50% rejeitado), atualiza o novo status no banco e, caso aprovado, publica a mensagem para o serviço de expedição. Se rejeitado, nada é publicado na fila de expedição..

2 - Consulta de pedido
* O serviço BFF é responsável por buscar os dados do pedido. Para isso, ele realiza chamadas assíncronas aos três serviços (checkout, payment, expedition) e agrega os dados.
* Se uma das chamadas falhar, os dados são retornados de forma parcial. Exemplo: caso o serviço de pagamento falhe, os dados de checkout e expedição ainda serão retornados normalmente.

---

## Serviços

* `BFF` – Backend For Frontend
* `checkout` – Serviço de checkout
* `payments` – Serviço de pagamentos
* `expedition` – Serviço de expedição
* `rabbitmq` – Broker de mensagens
* `postgres_*` – Bancos de dados isolados para cada serviço (checkout, payments, expedition)

---

## Entidades Banco de Dados

* Checkout: 
![Entidades Checkout](imgs/checkout.PNG)

* Payments:
![Entidades Payments](imgs/payments.PNG)

* Expedition:
![Entidades Expedition](imgs/expedition.PNG)

* A configuração do ORM utilizado (TypeORM) está ajustada para sincronizar automaticamente o esquema do banco de dados com as definições das entidades (classes) no código.
* Isso elimina a necessidade de executar migrations. Essa configuração é voltada apenas para testes e não deve ser utilizada em ambiente produtivo.

---

## Pré-requisitos

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* [Node.js](https://nodejs.org/pt)

---

## Como executar o projeto

### 1. Clone o repositório e entre na pasta

```bash
git clone https://github.com/ghbertuzzo/ecommerce-microservices.git
cd ecommerce-microservices
```
---

### 2. Suba os containers com Docker Compose Passando o .env.dev como parâmetro


```bash
docker-compose --env-file .env.dev up --build -d
```
Você também pode configurar um `.env.prod` para produção. 
Obs: Os arquivos .env não estão no gitignore somente para demonstração e facilitar a subida do ambiente.

---

## Testes

### 1. Como o serviço BFF é o orquestrador da aplicação, somente ele possui testes unitários, para execução entre na pasta bff e siga os passos abaixo:

```bash
# Entre na pasta do projeto
cd bff

# Instale as dependências
npm install

# Rode os testes
npm run test
```

## Acessos locais

| Serviço               | URL                                              |
| --------------------- | ------------------------------------------------ |
| BFF                   | [http://localhost:3000](http://localhost:3000)   |
| Checkout              | [http://localhost:3001](http://localhost:3001)   |
| Payments              | [http://localhost:3002](http://localhost:3002)   |
| Expedition            | [http://localhost:3003](http://localhost:3003)   |
| RabbitMQ UI           | [http://localhost:15672](http://localhost:15672) |
| PostgreSQL Checkout   | [http://localhost:5433](http://localhost:5433)   |
| PostgreSQL Payments   | [http://localhost:5434](http://localhost:5434)   |
| PostgreSQL Expedition | [http://localhost:5434](http://localhost:5435)   |
---

## Estrutura de Pastas

```plaintext
ecommerce-microservices/
├── bff/
├── checkout/
├── payments/
├── expedition/
├── docker-compose.yml
├── .env.dev
├── .env.prod
└── README.md
```

---
