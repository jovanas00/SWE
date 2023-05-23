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
        public string imeLjubimca {get; set;}

        [Column("Zivotinja")]
        [MaxLength(20)]
        [Required()]
        public string zivotinja { get; set; }

        // [Column("Usluga_Naziv")]
        // [Required()]
        // public string ime_usluge { get; set;}

        [Column("Cena")]
        [Required()]
        public float cena { get; set; }

        [Column("DatumVreme")]
        [Required()]
        public DateTime datumVreme { get; set; }

        [Column("Status")]
        [Required()]
        public string status { get; set; }

        [Column("KomentarSalona")]
        [MaxLength(150)]
        //[Required()]
        public string komentarSalona { get; set; }

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