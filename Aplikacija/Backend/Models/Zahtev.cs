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

        [Column("Zivotinja")]
        [MaxLength(20)]
        [Required()]
        public string Zivotinja { get; set; }

        [Column("Cena")]
        [Required()]
        public float Cena { get; set; }

        [Column("DatumVreme")]
        [Required()]
        public DateTime DatumVreme { get; set; }

        [Column("Status")]
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
        public virtual Usluga Usluga {get;set;}  
        #endregion ReferenceNaDrugeKlase
    }
}