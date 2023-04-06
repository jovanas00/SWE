﻿// <auto-generated />
using System;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(PPContext))]
    [Migration("20230406143008_V4")]
    partial class V4
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BackEnd.Models.Admin", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("AdminID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Ime");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Prezime");

                    b.HasKey("ID");

                    b.ToTable("ADMIN");
                });

            modelBuilder.Entity("BackEnd.Models.Kategorija", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("KategorijaID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Naziv");

                    b.HasKey("ID");

                    b.ToTable("KATEGORIJA");
                });

            modelBuilder.Entity("BackEnd.Models.Klijent", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("KlijentID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Adresa");

                    b.Property<string>("BrojTelefona")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)")
                        .HasColumnName("BrojTelefona");

                    b.Property<string>("Grad")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Grad");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Ime");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Prezime");

                    b.HasKey("ID");

                    b.ToTable("KLIJENT");
                });

            modelBuilder.Entity("BackEnd.Models.Korisnik", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("KorisnikID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Email");

                    b.Property<string>("KorisnickoIme")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("KorisnickoIme");

                    b.Property<string>("Sifra")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)")
                        .HasColumnName("Sifra");

                    b.Property<string>("Slika")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Slika");

                    b.Property<string>("Tip")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)")
                        .HasColumnName("Tip");

                    b.HasKey("ID");

                    b.ToTable("KORISNIK");
                });

            modelBuilder.Entity("BackEnd.Models.Korpa", b =>
                {
                    b.Property<int>("ID")
                        .HasColumnType("int")
                        .HasColumnName("KorpaID");

                    b.Property<float>("UkupnaCena")
                        .HasColumnType("real")
                        .HasColumnName("UkupnaCena");

                    b.HasKey("ID");

                    b.ToTable("KORPA");
                });

            modelBuilder.Entity("BackEnd.Models.KorpaProizvod", b =>
                {
                    b.Property<int>("KorpaID")
                        .HasColumnType("int")
                        .HasColumnName("KorpaID");

                    b.Property<int>("ProizvodID")
                        .HasColumnType("int")
                        .HasColumnName("ProizvodID");

                    b.Property<int>("Kolicina")
                        .HasColumnType("int")
                        .HasColumnName("Kolicina");

                    b.Property<int?>("NarudzbinaID")
                        .HasColumnType("int");

                    b.Property<string>("NazivProizvoda")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)")
                        .HasColumnName("NazivProizvoda");

                    b.Property<string>("SlikaProizvoda")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SlikaProizvoda");

                    b.HasKey("KorpaID", "ProizvodID");

                    b.HasIndex("NarudzbinaID");

                    b.HasIndex("ProizvodID");

                    b.ToTable("KORPA_PROIZVOD");
                });

            modelBuilder.Entity("BackEnd.Models.Narudzbina", b =>
                {
                    b.Property<int>("ID")
                        .HasColumnType("int")
                        .HasColumnName("NarudzbinaID");

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime")
                        .HasColumnName("Datum");

                    b.Property<int?>("KlijentID")
                        .HasColumnType("int");

                    b.Property<string>("KomentarSalona")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)")
                        .HasColumnName("KomentarSalona");

                    b.Property<int?>("SalonID")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Status");

                    b.Property<float>("UkupnaCena")
                        .HasColumnType("real")
                        .HasColumnName("UkupnaCena");

                    b.HasKey("ID");

                    b.HasIndex("KlijentID");

                    b.HasIndex("SalonID");

                    b.ToTable("NARUDZBINA");
                });

            modelBuilder.Entity("BackEnd.Models.Pitanje", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("PitanjeID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime")
                        .HasColumnName("Datum");

                    b.Property<int?>("KlijentID")
                        .HasColumnType("int");

                    b.Property<int?>("SalonID")
                        .HasColumnType("int");

                    b.Property<string>("TekstO")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("TekstO");

                    b.Property<string>("TekstP")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("TekstP");

                    b.HasKey("ID");

                    b.HasIndex("KlijentID");

                    b.HasIndex("SalonID");

                    b.ToTable("PITANJE");
                });

            modelBuilder.Entity("BackEnd.Models.Proizvod", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ProizvodID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<float>("Cena")
                        .HasColumnType("real")
                        .HasColumnName("Cena");

                    b.Property<bool>("Dostupnost")
                        .HasColumnType("bit")
                        .HasColumnName("Dostupnost");

                    b.Property<int?>("KategorijaID")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Naziv");

                    b.Property<int?>("SalonID")
                        .HasColumnType("int");

                    b.Property<string>("Slika")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Slika");

                    b.HasKey("ID");

                    b.HasIndex("KategorijaID");

                    b.HasIndex("SalonID");

                    b.ToTable("PROIZVOD");
                });

            modelBuilder.Entity("BackEnd.Models.Recenzija", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("RecenzijaID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime")
                        .HasColumnName("Datum");

                    b.Property<int?>("KlijentID")
                        .HasColumnType("int");

                    b.Property<float>("Ocena")
                        .HasColumnType("real")
                        .HasColumnName("Ocena");

                    b.Property<int?>("SalonID")
                        .HasColumnType("int");

                    b.Property<string>("Tekst")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("Tekst");

                    b.HasKey("ID");

                    b.HasIndex("KlijentID");

                    b.HasIndex("SalonID");

                    b.ToTable("RECENZIJA");
                });

            modelBuilder.Entity("BackEnd.Models.Salon", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("SalonID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Adresa");

                    b.Property<string>("BrojTelefona")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)")
                        .HasColumnName("BrojTelefona");

                    b.Property<string>("Grad")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Grad");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Naziv");

                    b.Property<float>("ProsecnaOcena")
                        .HasColumnType("real")
                        .HasColumnName("ProsecnaOcena");

                    b.HasKey("ID");

                    b.ToTable("SALON");
                });

            modelBuilder.Entity("BackEnd.Models.Usluga", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("UslugaID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<float>("Cena")
                        .HasColumnType("real")
                        .HasColumnName("Cena");

                    b.Property<bool>("Dostupnost")
                        .HasColumnType("bit")
                        .HasColumnName("Dostupnost");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Naziv");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)")
                        .HasColumnName("Opis");

                    b.Property<int?>("SalonID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("SalonID");

                    b.ToTable("USLUGA");
                });

            modelBuilder.Entity("BackEnd.Models.Zahtev", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ZahtevID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<float>("Cena")
                        .HasColumnType("real")
                        .HasColumnName("Cena");

                    b.Property<DateTime>("DatumVreme")
                        .HasColumnType("datetime2")
                        .HasColumnName("DatumVreme");

                    b.Property<string>("ImeLjubimca")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("ImeLjubimca");

                    b.Property<int?>("KlijentID")
                        .HasColumnType("int");

                    b.Property<string>("KomentarSalona")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)")
                        .HasColumnName("KomentarSalona");

                    b.Property<int?>("SalonID")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Status");

                    b.Property<string>("Zivotinja")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Zivotinja");

                    b.HasKey("ID");

                    b.HasIndex("KlijentID");

                    b.HasIndex("SalonID");

                    b.ToTable("ZAHTEV");
                });

            modelBuilder.Entity("UslugaZahtev", b =>
                {
                    b.Property<int>("UslugeID")
                        .HasColumnType("int");

                    b.Property<int>("ZahteviID")
                        .HasColumnType("int");

                    b.HasKey("UslugeID", "ZahteviID");

                    b.HasIndex("ZahteviID");

                    b.ToTable("UslugaZahtev");
                });

            modelBuilder.Entity("BackEnd.Models.Korpa", b =>
                {
                    b.HasOne("BackEnd.Models.Klijent", "Klijent")
                        .WithOne("Korpa")
                        .HasForeignKey("BackEnd.Models.Korpa", "ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Klijent");
                });

            modelBuilder.Entity("BackEnd.Models.KorpaProizvod", b =>
                {
                    b.HasOne("BackEnd.Models.Korpa", "Korpa")
                        .WithMany("Proizvodi")
                        .HasForeignKey("KorpaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackEnd.Models.Narudzbina", null)
                        .WithMany("Proizvodi")
                        .HasForeignKey("NarudzbinaID");

                    b.HasOne("BackEnd.Models.Proizvod", "Proizvod")
                        .WithMany("Korpe")
                        .HasForeignKey("ProizvodID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Korpa");

                    b.Navigation("Proizvod");
                });

            modelBuilder.Entity("BackEnd.Models.Narudzbina", b =>
                {
                    b.HasOne("BackEnd.Models.Korpa", "Korpa")
                        .WithOne("Narudzbina")
                        .HasForeignKey("BackEnd.Models.Narudzbina", "ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackEnd.Models.Klijent", "Klijent")
                        .WithMany("Narudzbine")
                        .HasForeignKey("KlijentID");

                    b.HasOne("BackEnd.Models.Salon", "Salon")
                        .WithMany("Narudzbine")
                        .HasForeignKey("SalonID");

                    b.Navigation("Klijent");

                    b.Navigation("Korpa");

                    b.Navigation("Salon");
                });

            modelBuilder.Entity("BackEnd.Models.Pitanje", b =>
                {
                    b.HasOne("BackEnd.Models.Klijent", "Klijent")
                        .WithMany("Pitanja")
                        .HasForeignKey("KlijentID");

                    b.HasOne("BackEnd.Models.Salon", "Salon")
                        .WithMany("Pitanja")
                        .HasForeignKey("SalonID");

                    b.Navigation("Klijent");

                    b.Navigation("Salon");
                });

            modelBuilder.Entity("BackEnd.Models.Proizvod", b =>
                {
                    b.HasOne("BackEnd.Models.Kategorija", "Kategorija")
                        .WithMany("Proizvodi")
                        .HasForeignKey("KategorijaID");

                    b.HasOne("BackEnd.Models.Salon", "Salon")
                        .WithMany("Proizvodi")
                        .HasForeignKey("SalonID");

                    b.Navigation("Kategorija");

                    b.Navigation("Salon");
                });

            modelBuilder.Entity("BackEnd.Models.Recenzija", b =>
                {
                    b.HasOne("BackEnd.Models.Klijent", "Klijent")
                        .WithMany("Recenzije")
                        .HasForeignKey("KlijentID");

                    b.HasOne("BackEnd.Models.Salon", "Salon")
                        .WithMany("Recenzije")
                        .HasForeignKey("SalonID");

                    b.Navigation("Klijent");

                    b.Navigation("Salon");
                });

            modelBuilder.Entity("BackEnd.Models.Usluga", b =>
                {
                    b.HasOne("BackEnd.Models.Salon", "Salon")
                        .WithMany("Usluge")
                        .HasForeignKey("SalonID");

                    b.Navigation("Salon");
                });

            modelBuilder.Entity("BackEnd.Models.Zahtev", b =>
                {
                    b.HasOne("BackEnd.Models.Klijent", "Klijent")
                        .WithMany("Zahtevi")
                        .HasForeignKey("KlijentID");

                    b.HasOne("BackEnd.Models.Salon", "Salon")
                        .WithMany("Zahtevi")
                        .HasForeignKey("SalonID");

                    b.Navigation("Klijent");

                    b.Navigation("Salon");
                });

            modelBuilder.Entity("UslugaZahtev", b =>
                {
                    b.HasOne("BackEnd.Models.Usluga", null)
                        .WithMany()
                        .HasForeignKey("UslugeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackEnd.Models.Zahtev", null)
                        .WithMany()
                        .HasForeignKey("ZahteviID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BackEnd.Models.Kategorija", b =>
                {
                    b.Navigation("Proizvodi");
                });

            modelBuilder.Entity("BackEnd.Models.Klijent", b =>
                {
                    b.Navigation("Korpa");

                    b.Navigation("Narudzbine");

                    b.Navigation("Pitanja");

                    b.Navigation("Recenzije");

                    b.Navigation("Zahtevi");
                });

            modelBuilder.Entity("BackEnd.Models.Korpa", b =>
                {
                    b.Navigation("Narudzbina");

                    b.Navigation("Proizvodi");
                });

            modelBuilder.Entity("BackEnd.Models.Narudzbina", b =>
                {
                    b.Navigation("Proizvodi");
                });

            modelBuilder.Entity("BackEnd.Models.Proizvod", b =>
                {
                    b.Navigation("Korpe");
                });

            modelBuilder.Entity("BackEnd.Models.Salon", b =>
                {
                    b.Navigation("Narudzbine");

                    b.Navigation("Pitanja");

                    b.Navigation("Proizvodi");

                    b.Navigation("Recenzije");

                    b.Navigation("Usluge");

                    b.Navigation("Zahtevi");
                });
#pragma warning restore 612, 618
        }
    }
}
