namespace BackEnd.Models
{
    public class PPContext : DbContext
    {
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Kategorija> Kategorija { get; set; }
        public DbSet<Klijent> Klijent { get; set; }
        public DbSet<Korisnik> Korisnik {get;set;}
        public DbSet<Korpa> Korpa { get; set; }
        public DbSet<Narudzbina> Narudzbina { get; set; }
        public DbSet<Pitanje> Pitanje { get; set; }
        public DbSet<Proizvod> Proizvod { get; set; }
        public DbSet<Recenzija> Recenzija { get; set; }
        public DbSet<Salon> Salon { get; set; }
        public DbSet<Usluga> Usluga { get; set; }
        public DbSet<Zahtev> Zahtev { get; set; }

        //tabele spoja
        public DbSet<KorpaProizvod> Proizvodi { get; set; }

        public PPContext(DbContextOptions options) : base(options)
        {

        }

        //za ovaj deo nisam sigurna da li je dobro
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Klijent>()
            .HasOne(k => k.Korpa)
            .WithOne(kp => kp.Klijent)
            .HasForeignKey<Korpa>(kp => kp.ID);

            modelBuilder.Entity<Korpa>()
            .HasOne(k => k.Narudzbina)
            .WithOne(n => n.Korpa)
            .HasForeignKey<Narudzbina>(n => n.ID);

            modelBuilder.Entity<KorpaProizvod>()
            .HasKey(kp => new { kp.KorpaID, kp.ProizvodID });
        }
    }
}