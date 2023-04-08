namespace BackEnd.Models
{
    [Table("KORPA_PROIZVOD")]
    public class KorpaProizvod
    {
        [JsonIgnore]
        public virtual Proizvod Proizvod { get; set; }

        [Column("ProizvodID")]
        public int proizvodID { get; set; }

        [Column("NazivProizvoda")]
        [MaxLength(30)]
        public string nazivProizvoda { get; set; }

        [Column("SlikaProizvoda")]
        public string slikaProizvoda { get; set; }

        [JsonIgnore]
        public virtual Korpa Korpa { get; set; }

        [Column("KorpaID")]
        public int korpaID { get; set; }

        [Required()]
        [Column("Kolicina")]
        public int Kolicina { get; set; }
    }
}