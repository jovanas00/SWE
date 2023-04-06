using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class V4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KLIJENT_KORISNIK_KorisnikID",
                table: "KLIJENT");

            migrationBuilder.DropForeignKey(
                name: "FK_SALON_KORISNIK_KorisnikID",
                table: "SALON");

            migrationBuilder.DropIndex(
                name: "IX_SALON_KorisnikID",
                table: "SALON");

            migrationBuilder.DropIndex(
                name: "IX_KLIJENT_KorisnikID",
                table: "KLIJENT");

            migrationBuilder.DropColumn(
                name: "Kapacitet",
                table: "USLUGA");

            migrationBuilder.DropColumn(
                name: "KorisnikID",
                table: "SALON");

            migrationBuilder.DropColumn(
                name: "KorisnikID",
                table: "KLIJENT");

            migrationBuilder.RenameColumn(
                name: "Zivotnja",
                table: "ZAHTEV",
                newName: "Zivotinja");

            migrationBuilder.AlterColumn<string>(
                name: "BrojTelefona",
                table: "SALON",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<DateTime>(
                name: "Datum",
                table: "RECENZIJA",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Datum",
                table: "PITANJE",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Datum",
                table: "NARUDZBINA",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "BrojTelefona",
                table: "KLIJENT",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Datum",
                table: "RECENZIJA");

            migrationBuilder.DropColumn(
                name: "Datum",
                table: "PITANJE");

            migrationBuilder.DropColumn(
                name: "Datum",
                table: "NARUDZBINA");

            migrationBuilder.RenameColumn(
                name: "Zivotinja",
                table: "ZAHTEV",
                newName: "Zivotnja");

            migrationBuilder.AddColumn<int>(
                name: "Kapacitet",
                table: "USLUGA",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<long>(
                name: "BrojTelefona",
                table: "SALON",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)",
                oldMaxLength: 13);

            migrationBuilder.AddColumn<int>(
                name: "KorisnikID",
                table: "SALON",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "BrojTelefona",
                table: "KLIJENT",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(13)",
                oldMaxLength: 13);

            migrationBuilder.AddColumn<int>(
                name: "KorisnikID",
                table: "KLIJENT",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SALON_KorisnikID",
                table: "SALON",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_KLIJENT_KorisnikID",
                table: "KLIJENT",
                column: "KorisnikID");

            migrationBuilder.AddForeignKey(
                name: "FK_KLIJENT_KORISNIK_KorisnikID",
                table: "KLIJENT",
                column: "KorisnikID",
                principalTable: "KORISNIK",
                principalColumn: "KorisnikID");

            migrationBuilder.AddForeignKey(
                name: "FK_SALON_KORISNIK_KorisnikID",
                table: "SALON",
                column: "KorisnikID",
                principalTable: "KORISNIK",
                principalColumn: "KorisnikID");
        }
    }
}
