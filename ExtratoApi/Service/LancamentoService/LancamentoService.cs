using LancamentoApi.DataContext;
using LancamentoApi.Models;
using LancamentoApi.Service.LancamentoService;
using Microsoft.EntityFrameworkCore;

namespace LancamentoApi.Service.Lancamentoervice
{
    public class LancamentoService : ILancamentoInterface
    {
        private readonly ApplicationDbContext _context;
        public LancamentoService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse<List<LancamentoModel>>> CreateLancamento(LancamentoModel novoLancamento)
        {
            ServiceResponse<List<LancamentoModel>> serviceResponse = new ServiceResponse<List<LancamentoModel>>();

            try
            {
                if(novoLancamento == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Informar dados!";
                    serviceResponse.Sucesso = false;

                    return serviceResponse;
                }

                _context.Add(novoLancamento);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Lancamento.ToList();


            }catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;
        }
        public async Task<ServiceResponse<List<LancamentoModel>>> CreateLancamentoNaoAvulso(LancamentoModel novoLancamento)
        {
            ServiceResponse<List<LancamentoModel>> serviceResponse = new ServiceResponse<List<LancamentoModel>>();

            try
            {
                if(novoLancamento == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Informar dados!";
                    serviceResponse.Sucesso = false;

                    return serviceResponse;
                }

                novoLancamento.avulso = Enums.EnumTipoLan.NaoAvulso;
                novoLancamento.status = Enums.EnumStatusLancamento.Valido;

                _context.Add(novoLancamento);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Lancamento.ToList();


            }catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<LancamentoModel>>> DeleteLancamento(int id)
        {
            ServiceResponse<List<LancamentoModel>> serviceResponse = new ServiceResponse<List<LancamentoModel>>();

            try
            {
                LancamentoModel Lancamento = _context.Lancamento.FirstOrDefault(x => x.Id == id);

                if (Lancamento == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Lançamento não localizado!";
                    serviceResponse.Sucesso = false;

                    return serviceResponse;
                }


                _context.Lancamento.Remove(Lancamento);
                await _context.SaveChangesAsync();


                serviceResponse.Dados = _context.Lancamento.ToList();

            }
            catch(Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<LancamentoModel>> GetLancamentoById(int id)
        {
            ServiceResponse<LancamentoModel> serviceResponse = new ServiceResponse<LancamentoModel>();

            try
            {
                LancamentoModel Lancamento = _context.Lancamento.FirstOrDefault(x => x.Id == id);

                if(Lancamento == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Lançamento não localizado!";
                    serviceResponse.Sucesso = false;
                }

                serviceResponse.Dados = Lancamento;

            }
            catch(Exception ex)
            {

                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<LancamentoModel>>> GetLancamento(DateTime inicio, DateTime fim)
        {
            ServiceResponse<List<LancamentoModel>> serviceResponse = new ServiceResponse<List<LancamentoModel>>();

            try
            {
                serviceResponse.Dados = _context.Lancamento
                .Where( x => x.dia.Date >= inicio && x.dia.Date <= fim)
                .ToList();

                if(serviceResponse.Dados.Count == 0)
                {
                    serviceResponse.Mensagem = "Nenhum dado encontrado!";
                }


            }catch(Exception ex)
            {

                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;

        }

        public async Task<ServiceResponse<List<LancamentoModel>>> cancelaLancamento(int id)
        {
            ServiceResponse<List<LancamentoModel>> serviceResponse = new ServiceResponse<List<LancamentoModel>>();

            try
            {
                LancamentoModel Lancamento = _context.Lancamento.FirstOrDefault(x => x.Id == id);

                if(Lancamento == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Lançamento não localizado!";
                    serviceResponse.Sucesso = false;
                }

                Lancamento.status = Enums.EnumStatusLancamento.Cancelado;

                _context.Lancamento.Update(Lancamento);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Lancamento.ToList();


            }catch(Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<LancamentoModel>>> UpdateLancamento(LancamentoModel editadoLancamento)
        {
            ServiceResponse<List<LancamentoModel>> serviceResponse = new ServiceResponse<List<LancamentoModel>>();

            try
            {
                LancamentoModel Lancamento = _context.Lancamento.AsNoTracking().FirstOrDefault(x => x.Id == editadoLancamento.Id);

                if (Lancamento == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Lançamento não localizado!";
                    serviceResponse.Sucesso = false;
                }

                _context.Lancamento.Update(editadoLancamento);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Lancamento.ToList();

            }
            catch(Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;
        }
    }
}
