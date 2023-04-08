namespace BackEnd.Models
{
    [Table("KORISNIK")]
    public class Korisnik 
    {
        [Key()]
        [JsonIgnore]
        [Column("KorisnikID")]
        public int ID { get; set; }

        [JsonIgnore]
        [Column("Email")]
        public string email { get; set; }

        [Column("KorisnickoIme")]
        [MaxLength(20)]
        [Required()]
        public string korisnickoIme {get; set;}

        [Column("Sifra")]
        [MaxLength(150)]
        [Required()]
        public string sifra { get; set; }

        [Column("Salt_value")]
        public byte[] salt_value {get; set; }

        [Column("Tip")]
        [MaxLength(10)]
        [Required()]
        public string tip { get; set; }

        [Column("Slika")]
        public string slika { get; set; }
   }
}