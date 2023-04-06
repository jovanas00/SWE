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
        //ogranicenje i tip?---NEMA OGRANICENJE,DateTime pa se format napravi da prikaze samo datum?
        [Required()]
        [NotMapped] //pravi mi problem kad pokusam da kreiram migracije, ali ne znam okej li je---Ako se uradi ovo od iznad vrv nece pravi problem
        public DateOnly Datum {get; set;}

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;}
        #endregion ReferenceNaDrugeKlase
   }
}