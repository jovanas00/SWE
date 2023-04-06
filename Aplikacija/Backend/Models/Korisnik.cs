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
        public string Email { get; set; }

        [Column("KorisnickoIme")]
        [MaxLength(20)]
        [Required()]
        public string KorisnickoIme {get; set;}

        [Column("Sifra")]
        [MaxLength(150)]
        [Required()]
        public string Sifra { get; set; }

        [Column("Tip")]
        [MaxLength(10)]
        [Required()]
        public string Tip { get; set; }

        [Column("Slika")]
        public string Slika { get; set; }
   }
}