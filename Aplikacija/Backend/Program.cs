var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<PPContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("PetPlanetCS"));
});

builder.Services.AddCors(options=>
{
    options.AddPolicy("CORS", policy =>
    {
        policy.AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins("https://localhost:5555/",
                     "http://localhost:5555");
    });
});

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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
