# Extrato de lançamentos

Aplicação web para consultar e administrar lançamentos financeiros. O projeto contém uma interface Angular, uma API REST em ASP.NET Core e um banco SQL Server. Todos os serviços podem ser iniciados com Docker Compose.

## Iniciar com Docker

Requisitos: Docker Desktop (ou Docker Engine) com o plugin Docker Compose.

Na raiz do repositório, execute:

```powershell
docker compose up --build
```

Na primeira execução, o Compose baixa as imagens, compila a API e a interface, inicia o SQL Server e cria/atualiza o schema por meio das migrações do Entity Framework.

- Interface: http://localhost:8080
- API: http://localhost:8081/api/Lancamento
- Swagger: http://localhost:8081/swagger
- SQL Server: `localhost,1433` (usuário `sa`)

Para encerrar os serviços, pressione `Ctrl+C` e execute `docker compose down`. Os dados do SQL Server ficam no volume `sqlserver_data` e são mantidos entre reinicializações. Para removê-los também, execute `docker compose down -v`.

### Configurações opcionais

O Compose tem valores locais de desenvolvimento para facilitar o primeiro início. Antes de compartilhar a máquina ou usar um ambiente persistente, defina uma senha própria para o SQL Server e, opcionalmente, portas diferentes. Crie um arquivo `.env` na raiz:

```dotenv
MSSQL_SA_PASSWORD=UmaSenhaForte_2026!
WEB_PORT=8080
API_PORT=8081
MSSQL_PORT=1433
```

A senha do SQL Server deve atender aos requisitos de complexidade do SQL Server. Não envie o `.env` para o controle de versão.

## Serviços e estrutura

- `ExtratoApp/`: frontend Angular 16 e Angular Material. O Nginx serve a aplicação e encaminha `/api` para o serviço da API.
- `ExtratoApi/`: API ASP.NET Core 6 e Entity Framework Core.
- `database`: SQL Server 2022 Developer com armazenamento persistente.
- `docker-compose.yml`: rede, portas, dependências e volume dos serviços.

## Endpoints principais

Prefixo: `/api/Lancamento`.

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/RangeData?inicio=AAAA-MM-DD&fim=AAAA-MM-DD` | Lista lançamentos dentro do intervalo |
| GET | `/{id}` | Consulta um lançamento |
| POST | `/` | Cria lançamento |
| POST | `/NaoAvulso` | Cria lançamento não avulso e válido |
| PUT | `/` | Atualiza lançamento |
| PUT | `/cancelaLancamento?id={id}` | Cancela lançamento |
| DELETE | `/?id={id}` | Exclui lançamento |

As respostas usam o envelope `ServiceResponse`, com `dados`, `mensagem` e `sucesso`. Os enums são representados como texto (`Avulso`, `NaoAvulso`, `Valido`, `Cancelado`).

## Execução sem Docker

### API

Configure `ConnectionStrings:DefaultConnection` em `ExtratoApi/appsettings.json` para sua instância SQL Server. Com .NET SDK instalado:

```powershell
cd ExtratoApi
dotnet restore
dotnet tool install --global dotnet-ef --version 7.0.13 # se necessário
dotnet ef database update
dotnet run
```

O perfil de desenvolvimento usa `https://localhost:7212` e `http://localhost:5152`.

### Interface

Em outro terminal:

```powershell
cd ExtratoApp
npm install
npm start
```

O cliente usa `/api`; durante execução local sem o Nginx do Compose, configure o endereço da API em `src/environments/environment.development.ts`.

## Verificações

```powershell
docker compose config
docker compose build
```

O projeto usa .NET 6, que está fora de suporte. Planeje atualizar o framework e as dependências do Entity Framework em uma alteração futura.
