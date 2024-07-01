using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class mig22 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShipToAdress_ZipCode",
                table: "Orders",
                newName: "ShipToAddress_ZipCode");

            migrationBuilder.RenameColumn(
                name: "ShipToAdress_Street",
                table: "Orders",
                newName: "ShipToAddress_Street");

            migrationBuilder.RenameColumn(
                name: "ShipToAdress_State",
                table: "Orders",
                newName: "ShipToAddress_State");

            migrationBuilder.RenameColumn(
                name: "ShipToAdress_LastName",
                table: "Orders",
                newName: "ShipToAddress_LastName");

            migrationBuilder.RenameColumn(
                name: "ShipToAdress_FirstName",
                table: "Orders",
                newName: "ShipToAddress_FirstName");

            migrationBuilder.RenameColumn(
                name: "ShipToAdress_City",
                table: "Orders",
                newName: "ShipToAddress_City");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShipToAddress_ZipCode",
                table: "Orders",
                newName: "ShipToAdress_ZipCode");

            migrationBuilder.RenameColumn(
                name: "ShipToAddress_Street",
                table: "Orders",
                newName: "ShipToAdress_Street");

            migrationBuilder.RenameColumn(
                name: "ShipToAddress_State",
                table: "Orders",
                newName: "ShipToAdress_State");

            migrationBuilder.RenameColumn(
                name: "ShipToAddress_LastName",
                table: "Orders",
                newName: "ShipToAdress_LastName");

            migrationBuilder.RenameColumn(
                name: "ShipToAddress_FirstName",
                table: "Orders",
                newName: "ShipToAdress_FirstName");

            migrationBuilder.RenameColumn(
                name: "ShipToAddress_City",
                table: "Orders",
                newName: "ShipToAdress_City");
        }
    }
}
