var builder = WebApplication.CreateBuilder(args);

var clientOrigin = "_clientOrigin";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: clientOrigin,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(clientOrigin);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
