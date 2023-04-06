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
<<<<<<< HEAD
        [Range(1, 5)] 
=======
        //ogranicenje npr manja od 5---Range 1 do 5
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        [Required()]
        public float Ocena {get; set;}

        [Column("Datum")]
<<<<<<< HEAD
=======
        //ogranicenje i tip?---Isto od malopre
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
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