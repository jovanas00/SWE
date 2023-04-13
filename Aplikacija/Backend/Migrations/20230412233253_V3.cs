using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class V3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Datum",
                table: "PITANJE",
                newName: "DatumPostavljanja");

            migrationBuilder.AlterColumn<string>(
                name: "TekstO",
                table: "PITANJE",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<DateTime>(
                name: "DatumOdgovaranja",
                table: "PITANJE",
                type: "datetime",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DatumOdgovaranja",
                table: "PITANJE");

            migrationBuilder.RenameColumn(
                name: "DatumPostavljanja",
                table: "PITANJE",
                newName: "Datum");

            migrationBuilder.AlterColumn<string>(
                name: "TekstO",
                table: "PITANJE",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);
        }
    }
}
