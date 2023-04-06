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
        //ogranicenje npr manja od 5---Range 1 do 5
        [Required()]
        public float Ocena {get; set;}

        [Column("Datum")]
        //ogranicenje i tip?---Isto od malopre
        [Required()]
        [NotMapped] //pravi problem kod migracije, trebalo bi da to znaci da ga ne mapira na bazu
                                                   //tako da mislim da bi trebalo da s resi nekako s modelBuilder u PPContext
        public DateOnly Datum {get; set;}

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;}
        #endregion ReferenceNaDrugeKlase
   }
}