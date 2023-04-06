namespace BackEnd.Models
{
    [Table("NARUDZBINA")]
    public class Narudzbina 
    {
        [Key()]
        [JsonIgnore]
        [Column("NarudzbinaID")]
        public int ID { get; set; }

        [Column("Status")]
        //ogranicenje i tip?
        [Required()]
        public string Status {get; set;}

        [Column("KomentarSalona")]
        [MaxLength(150)]
        [Required()]
        public string KomentarSalona {get; set;}

        [Column("UkupnaCena")]
        //ogranicenje?
        [Required()]
        public float UkupnaCena {get; set;}

        [Column("Datum")]
        [Required()]
        public DateTime Datum {get; set;}

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual List<KorpaProizvod> Proizvodi {get;set;} 
        [JsonIgnore]
        public virtual Korpa Korpa {get;set;} 
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;}
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        #endregion ReferenceNaDrugeKlase
   }
}