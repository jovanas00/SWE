namespace BackEnd.Models
{
    [Table("KORPA_PROIZVOD")]
    public class KorpaProizvod
    {
        [JsonIgnore]
        public virtual Proizvod Proizvod { get; set; }
        //Column za id?---DA
        public int ProizvodID { get; set; }
        [Column("NazivProizvoda")]
        [MaxLength(30)]
        public string NazivProizvoda { get; set; }
        //tip za sliku? ogranicenje?---STRING,NEMA
        [Column("SlikaProizvoda")]
        public string SlikaProizvoda { get; set; }
        [JsonIgnore]
        public virtual Korpa Korpa { get; set; }
        //Column za id?---DA
        public int KorpaID { get; set; }
        [Required()]
        [Column("Kolicina")]
        public int Kolicina { get; set; }
    }
}