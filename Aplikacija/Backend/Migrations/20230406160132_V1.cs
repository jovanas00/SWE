using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ADMIN",
                columns: table => new
                {
                    AdminID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ADMIN", x => x.AdminID);
                });

            migrationBuilder.CreateTable(
                name: "KATEGORIJA",
                columns: table => new
                {
                    KategorijaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KATEGORIJA", x => x.KategorijaID);
                });

            migrationBuilder.CreateTable(
                name: "KLIJENT",
                columns: table => new
                {
                    KlijentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    BrojTelefona = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KLIJENT", x => x.KlijentID);
                });

            migrationBuilder.CreateTable(
                name: "KORISNIK",
                columns: table => new
                {
                    KorisnikID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Sifra = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KORISNIK", x => x.KorisnikID);
                });

            migrationBuilder.CreateTable(
                name: "SALON",
                columns: table => new
                {
                    SalonID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    ProsecnaOcena = table.Column<float>(type: "real", nullable: false),
                    BrojTelefona = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SALON", x => x.SalonID);
                });

            migrationBuilder.CreateTable(
                name: "KORPA",
                columns: table => new
                {
                    KorpaID = table.Column<int>(type: "int", nullable: false),
                    UkupnaCena = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KORPA", x => x.KorpaID);
                    table.ForeignKey(
                        name: "FK_KORPA_KLIJENT_KorpaID",
                        column: x => x.KorpaID,
                        principalTable: "KLIJENT",
                        principalColumn: "KlijentID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PITANJE",
                columns: table => new
                {
                    PitanjeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TekstP = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TekstO = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Datum = table.Column<DateTime>(type: "datetime", nullable: false),
                    SalonID = table.Column<int>(type: "int", nullable: true),
                    KlijentID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PITANJE", x => x.PitanjeID);
                    table.ForeignKey(
                        name: "FK_PITANJE_KLIJENT_KlijentID",
                        column: x => x.KlijentID,
                        principalTable: "KLIJENT",
                        principalColumn: "KlijentID");
                    table.ForeignKey(
                        name: "FK_PITANJE_SALON_SalonID",
                        column: x => x.SalonID,
                        principalTable: "SALON",
                        principalColumn: "SalonID");
                });

            migrationBuilder.CreateTable(
                name: "PROIZVOD",
                columns: table => new
                {
                    ProizvodID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Cena = table.Column<float>(type: "real", nullable: false),
                    Dostupnost = table.Column<bool>(type: "bit", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KategorijaID = table.Column<int>(type: "int", nullable: true),
                    SalonID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROIZVOD", x => x.ProizvodID);
                    table.ForeignKey(
                        name: "FK_PROIZVOD_KATEGORIJA_KategorijaID",
                        column: x => x.KategorijaID,
                        principalTable: "KATEGORIJA",
                        principalColumn: "KategorijaID");
                    table.ForeignKey(
                        name: "FK_PROIZVOD_SALON_SalonID",
                        column: x => x.SalonID,
                        principalTable: "SALON",
                        principalColumn: "SalonID");
                });

            migrationBuilder.CreateTable(
                name: "RECENZIJA",
                columns: table => new
                {
                    RecenzijaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tekst = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Ocena = table.Column<float>(type: "real", nullable: false),
                    Datum = table.Column<DateTime>(type: "datetime", nullable: false),
                    SalonID = table.Column<int>(type: "int", nullable: true),
                    KlijentID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RECENZIJA", x => x.RecenzijaID);
                    table.ForeignKey(
                        name: "FK_RECENZIJA_KLIJENT_KlijentID",
                        column: x => x.KlijentID,
                        principalTable: "KLIJENT",
                        principalColumn: "KlijentID");
                    table.ForeignKey(
                        name: "FK_RECENZIJA_SALON_SalonID",
                        column: x => x.SalonID,
                        principalTable: "SALON",
                        principalColumn: "SalonID");
                });

            migrationBuilder.CreateTable(
                name: "USLUGA",
                columns: table => new
                {
                    UslugaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Cena = table.Column<float>(type: "real", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Dostupnost = table.Column<bool>(type: "bit", nullable: false),
                    SalonID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USLUGA", x => x.UslugaID);
                    table.ForeignKey(
                        name: "FK_USLUGA_SALON_SalonID",
                        column: x => x.SalonID,
                        principalTable: "SALON",
                        principalColumn: "SalonID");
                });

            migrationBuilder.CreateTable(
                name: "NARUDZBINA",
                columns: table => new
                {
                    NarudzbinaID = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KomentarSalona = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    UkupnaCena = table.Column<float>(type: "real", nullable: false),
                    Datum = table.Column<DateTime>(type: "datetime", nullable: false),
                    KlijentID = table.Column<int>(type: "int", nullable: true),
                    SalonID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NARUDZBINA", x => x.NarudzbinaID);
                    table.ForeignKey(
                        name: "FK_NARUDZBINA_KLIJENT_KlijentID",
                        column: x => x.KlijentID,
                        principalTable: "KLIJENT",
                        principalColumn: "KlijentID");
                    table.ForeignKey(
                        name: "FK_NARUDZBINA_KORPA_NarudzbinaID",
                        column: x => x.NarudzbinaID,
                        principalTable: "KORPA",
                        principalColumn: "KorpaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NARUDZBINA_SALON_SalonID",
                        column: x => x.SalonID,
                        principalTable: "SALON",
                        principalColumn: "SalonID");
                });

            migrationBuilder.CreateTable(
                name: "ZAHTEV",
                columns: table => new
                {
                    ZahtevID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImeLjubimca = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Zivotinja = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Cena = table.Column<float>(type: "real", nullable: false),
                    DatumVreme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KomentarSalona = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    SalonID = table.Column<int>(type: "int", nullable: true),
                    KlijentID = table.Column<int>(type: "int", nullable: true),
                    UslugaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZAHTEV", x => x.ZahtevID);
                    table.ForeignKey(
                        name: "FK_ZAHTEV_KLIJENT_KlijentID",
                        column: x => x.KlijentID,
                        principalTable: "KLIJENT",
                        principalColumn: "KlijentID");
                    table.ForeignKey(
                        name: "FK_ZAHTEV_SALON_SalonID",
                        column: x => x.SalonID,
                        principalTable: "SALON",
                        principalColumn: "SalonID");
                    table.ForeignKey(
                        name: "FK_ZAHTEV_USLUGA_UslugaID",
                        column: x => x.UslugaID,
                        principalTable: "USLUGA",
                        principalColumn: "UslugaID");
                });

            migrationBuilder.CreateTable(
                name: "KORPA_PROIZVOD",
                columns: table => new
                {
                    ProizvodID = table.Column<int>(type: "int", nullable: false),
                    KorpaID = table.Column<int>(type: "int", nullable: false),
                    NazivProizvoda = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    SlikaProizvoda = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    NarudzbinaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KORPA_PROIZVOD", x => new { x.KorpaID, x.ProizvodID });
                    table.ForeignKey(
                        name: "FK_KORPA_PROIZVOD_KORPA_KorpaID",
                        column: x => x.KorpaID,
                        principalTable: "KORPA",
                        principalColumn: "KorpaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KORPA_PROIZVOD_NARUDZBINA_NarudzbinaID",
                        column: x => x.NarudzbinaID,
                        principalTable: "NARUDZBINA",
                        principalColumn: "NarudzbinaID");
                    table.ForeignKey(
                        name: "FK_KORPA_PROIZVOD_PROIZVOD_ProizvodID",
                        column: x => x.ProizvodID,
                        principalTable: "PROIZVOD",
                        principalColumn: "ProizvodID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KORPA_PROIZVOD_NarudzbinaID",
                table: "KORPA_PROIZVOD",
                column: "NarudzbinaID");

            migrationBuilder.CreateIndex(
                name: "IX_KORPA_PROIZVOD_ProizvodID",
                table: "KORPA_PROIZVOD",
                column: "ProizvodID");

            migrationBuilder.CreateIndex(
                name: "IX_NARUDZBINA_KlijentID",
                table: "NARUDZBINA",
                column: "KlijentID");

            migrationBuilder.CreateIndex(
                name: "IX_NARUDZBINA_SalonID",
                table: "NARUDZBINA",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_PITANJE_KlijentID",
                table: "PITANJE",
                column: "KlijentID");

            migrationBuilder.CreateIndex(
                name: "IX_PITANJE_SalonID",
                table: "PITANJE",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_PROIZVOD_KategorijaID",
                table: "PROIZVOD",
                column: "KategorijaID");

            migrationBuilder.CreateIndex(
                name: "IX_PROIZVOD_SalonID",
                table: "PROIZVOD",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_RECENZIJA_KlijentID",
                table: "RECENZIJA",
                column: "KlijentID");

            migrationBuilder.CreateIndex(
                name: "IX_RECENZIJA_SalonID",
                table: "RECENZIJA",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_USLUGA_SalonID",
                table: "USLUGA",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_ZAHTEV_KlijentID",
                table: "ZAHTEV",
                column: "KlijentID");

            migrationBuilder.CreateIndex(
                name: "IX_ZAHTEV_SalonID",
                table: "ZAHTEV",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_ZAHTEV_UslugaID",
                table: "ZAHTEV",
                column: "UslugaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ADMIN");

            migrationBuilder.DropTable(
                name: "KORISNIK");

            migrationBuilder.DropTable(
                name: "KORPA_PROIZVOD");

            migrationBuilder.DropTable(
                name: "PITANJE");

            migrationBuilder.DropTable(
                name: "RECENZIJA");

            migrationBuilder.DropTable(
                name: "ZAHTEV");

            migrationBuilder.DropTable(
                name: "NARUDZBINA");

            migrationBuilder.DropTable(
                name: "PROIZVOD");

            migrationBuilder.DropTable(
                name: "USLUGA");

            migrationBuilder.DropTable(
                name: "KORPA");

            migrationBuilder.DropTable(
                name: "KATEGORIJA");

            migrationBuilder.DropTable(
                name: "SALON");

            migrationBuilder.DropTable(
                name: "KLIJENT");
        }
    }
}
