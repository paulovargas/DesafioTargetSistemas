using LancamentoApi.DataContext;
using LancamentoApi.Service.Lancamentoervice;
using LancamentoApi.Service.LancamentoService;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
string mySqlConnection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ILancamentoInterface,LancamentoService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ExtratoApp", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ExtratoApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
