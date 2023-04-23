namespace BackEnd.Models
{
    public class PPContext : DbContext
    {
        public DbSet<Admin> Admini { get; set; }
        public DbSet<Kategorija> Kategorije { get; set; }
        public DbSet<Klijent> Klijenti { get; set; }
        public DbSet<Korisnik> Korisnici {get;set;}
        public DbSet<Korpa> Korpe { get; set; }
        public DbSet<Narudzbina> Narudzbine { get; set; }
        public DbSet<Pitanje> Pitanja { get; set; }
        public DbSet<Proizvod> Proizvodi { get; set; }
        public DbSet<Recenzija> Recenzije { get; set; }
        public DbSet<Salon> Saloni { get; set; }
        public DbSet<Usluga> Usluge { get; set; }
        public DbSet<Zahtev> Zahtevi { get; set; }
        public DbSet<NaruceniProizvod> NaruceniProizvodi { get; set; }

        //tabele spoja
        public DbSet<KorpaProizvod> KorpeProizvodi { get; set; }

        public PPContext(DbContextOptions options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Klijent>()
            .HasOne(k => k.Korpa)
            .WithOne(kp => kp.Klijent)
            .HasForeignKey<Korpa>(kp => kp.ID);

            // modelBuilder.Entity<Korpa>()
            // .HasOne(k => k.Narudzbina)
            // .WithOne(n => n.Korpa)
            // .HasForeignKey<Narudzbina>(n => n.ID);

            modelBuilder.Entity<KorpaProizvod>()
            .HasKey(kp => new { kp.korpaID, kp.proizvodID });

            modelBuilder.Entity<Pitanje>()
            .Property(p => p.datumPostavljanja)
            .HasColumnType("datetime");

            modelBuilder.Entity<Pitanje>()
            .Property(p => p.datumOdgovaranja)
            .HasColumnType("datetime");

            modelBuilder
            .Entity<Recenzija>()
            .Property(e => e.datum)
            .HasColumnType("datetime");

            modelBuilder
            .Entity<Narudzbina>()
            .Property(e => e.datum)
            .HasColumnType("datetime");
        }
    }
}