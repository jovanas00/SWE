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
        public string TekstP {get; set;}

        [Column("TekstO")]
        [MaxLength(50)]
        [Required()]
        public string TekstO {get; set;}

        [Column("Datum")]
        //ogranicenje i tip?
        [Required()]
        [NotMapped] //pravi mi problem kad pokusam da kreiram migracije, ali ne znam okej li je
        public DateOnly Datum {get; set;}

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;}
        #endregion ReferenceNaDrugeKlase
   }
}