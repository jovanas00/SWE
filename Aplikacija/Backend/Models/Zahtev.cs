namespace BackEnd.Models
{
    [Table("ZAHTEV")]
    public class Zahtev 
    {
        [Key()]
        [JsonIgnore]
        [Column("ZahtevID")]
        public int ID { get; set; }

        [Column("ImeLjubimca")]
        [MaxLength(20)]
        [Required()]
        public string ImeLjubimca {get; set;}

        [Column("Zivotnja")]
        [MaxLength(20)]
        [Required()]
        public string Zivotnja { get; set; }

        [Column("Cena")]
        //ogranicenje?---NEMA
        [Required()]
        public float Cena { get; set; }

        [Column("DatumVreme")]
        //ogranicenje?---NEMA
        [Required()]
        public DateTime DatumVreme { get; set; }

        [Column("Status")]
        //ogranicenje i tip?---NEMA,ENUM
        [Required()]
        public string Status { get; set; }

        [Column("KomentarSalona")]
        [MaxLength(150)]
        [Required()]
        public string KomentarSalona { get; set; }

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;} 
        [JsonIgnore]
        public virtual List<Usluga> Usluge {get;set;}  
        #endregion ReferenceNaDrugeKlase
    }
}