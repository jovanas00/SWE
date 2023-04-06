namespace BackEnd.Models
{
    [Table("RECENZIJA")]
    public class Recenzija 
    {
        [Key()]
        [JsonIgnore]
        [Column("RecenzijaID")]
        public int ID { get; set; }

        [Column("Tekst")]
        [MaxLength(100)]
        [Required()]
        public string Tekst {get; set;}

        [Column("Ocena")]
        [Range(1, 5)] 
        [Required()]
        public float Ocena {get; set;}

        [Column("Datum")]
        [Required()]
        public DateTime Datum {get; set;}

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;}
        #endregion ReferenceNaDrugeKlase
   }
}