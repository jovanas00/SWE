namespace BackEnd.Models
{
    [Table("KORPA_PROIZVOD")]
    public class KorpaProizvod
    {
        [JsonIgnore]
        public virtual Proizvod Proizvod { get; set; }
<<<<<<< HEAD

        [Column("ProizvodID")]
=======
        //Column za id?---DA
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        public int ProizvodID { get; set; }

        [Column("NazivProizvoda")]
        [MaxLength(30)]
        public string NazivProizvoda { get; set; }
<<<<<<< HEAD

=======
        //tip za sliku? ogranicenje?---STRING,NEMA
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        [Column("SlikaProizvoda")]
        public string SlikaProizvoda { get; set; }

        [JsonIgnore]
        public virtual Korpa Korpa { get; set; }
<<<<<<< HEAD

        [Column("KorpaID")]
=======
        //Column za id?---DA
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        public int KorpaID { get; set; }
        
        [Required()]
        [Column("Kolicina")]
        public int Kolicina { get; set; }
    }
}