namespace BackEnd.Models
{
    [Table("USLUGA")]
    public class Usluga 
    {
        [Key()]
        [JsonIgnore]
        [Column("UslugaID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(20)]
        [Required()]
        public string Naziv {get; set;}

        [Column("Cena")]
        [Required()]
        public float cena {get; set;}

        [Column("Opis")]
        [MaxLength(300)]
        [Required()]
        public string opis {get; set;}

        [Column("Dostupnost")]
        [Required()]
        public bool dostupnost {get; set;}

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        [JsonIgnore]
        public virtual List<Zahtev> Zahtevi {get;set;}
        #endregion ReferenceNaDrugeKlase
   }
}