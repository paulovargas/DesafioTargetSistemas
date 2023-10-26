using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LancamentoApi.Models;
using LancamentoApi.Service.LancamentoService;

namespace Lancamento.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LancamentoController : ControllerBase
    {
        private readonly ILancamentoInterface _LancamentoInterface;
        public LancamentoController(ILancamentoInterface LancamentoInterface)
        {
            _LancamentoInterface = LancamentoInterface;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<LancamentoModel>>>> GetLancamento()
        {
            return Ok( await _LancamentoInterface.GetLancamento());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<LancamentoModel>>> GetLancamentoById(int id)
        {
            ServiceResponse<LancamentoModel> serviceResponse = await _LancamentoInterface.GetLancamentoById(id);

            return Ok(serviceResponse);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<LancamentoModel>>>> CreateLancamento(LancamentoModel novoLancamento)
        {
            return Ok(await _LancamentoInterface.CreateLancamento(novoLancamento));
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<LancamentoModel>>>> UpdateLancamento(LancamentoModel editadoLancamento)
        {
            ServiceResponse<List<LancamentoModel>> serviceResponse = await _LancamentoInterface.UpdateLancamento(editadoLancamento);

            return Ok(serviceResponse);
        }


        [HttpPut("inativaLancamento")]
        public async Task<ActionResult<ServiceResponse<List<LancamentoModel>>>> InativaLancamento(int id)
        {
            ServiceResponse<List<LancamentoModel>> serviceResponse = await _LancamentoInterface.InativaLancamento(id);

            return Ok(serviceResponse);

        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<List<LancamentoModel>>>> DeleteLancamento(int id)
        {
            ServiceResponse<List<LancamentoModel>> serviceResponse = await _LancamentoInterface.DeleteLancamento(id);

            return Ok(serviceResponse);

        }

    }
}
