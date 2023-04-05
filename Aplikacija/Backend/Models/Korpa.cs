namespace BackEnd.Models
{
    [Table("KORPA")]
    public class Korpa
    {
        [Key()]
        [JsonIgnore]
        [Column("KorpaID")]
        public int ID { get; set; }

        [Column("UkupnaCena")]
        //ogranicnje?
        [Required()]
        public float UkupnaCena { get; set; }

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;} 
        [JsonIgnore]
        public virtual Narudzbina Narudzbina {get;set;}  
        [JsonIgnore]
        public virtual List<KorpaProizvod> Proizvodi {get;set;} 
        #endregion ReferenceNaDrugeKlase
   }
}