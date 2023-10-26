﻿using LancamentoApi.Models;

namespace LancamentoApi.Service.LancamentoService
{
    public interface ILancamentoInterface
    {
        Task<ServiceResponse<List<LancamentoModel>>> GetLancamento();
        Task<ServiceResponse<List<LancamentoModel>>> CreateLancamento(LancamentoModel novoLancamento);
        Task<ServiceResponse<LancamentoModel>> GetLancamentoById(int id);
        Task<ServiceResponse<List<LancamentoModel>>> UpdateLancamento(LancamentoModel editadoLancamento);
        Task<ServiceResponse<List<LancamentoModel>>> DeleteLancamento(int id);
        Task<ServiceResponse<List<LancamentoModel>>> InativaLancamento(int id);
    }
}
