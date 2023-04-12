namespace BackEnd.Models
{
    [Table("PITANJE")]
    public class Pitanje 
    {
        [Key()]
        [JsonIgnore]
        [Column("PitanjeID")]
        public int ID { get; set; }

        [Column("TekstP")]
        [MaxLength(50)]
        [Required()]
        public string tekstP {get; set;}

        [Column("TekstO")]
        [MaxLength(50)]
        public string tekstO {get; set;}

        [Column("DatumPostavljanja")]
        [Required()]
        public DateTime datumPostavljanja {get; set;}

        [Column("DatumOdgovaranja")]
        public DateTime? datumOdgovaranja {get; set;}

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;}
        #endregion ReferenceNaDrugeKlase
   }
}