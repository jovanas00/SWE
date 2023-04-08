namespace BackEnd.Models
{
    [Table("PROIZVOD")]
    public class Proizvod 
    {
        [Key()]
        [JsonIgnore]
        [Column("ProizvodID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(20)]
        [Required()]
        public string naziv {get; set;}

        [Column("Cena")]
        [Required()]
        public float cena {get; set;}

        [Column("Dostupnost")]
        [Required()]
        public bool dostupnost {get; set;}

        [Column("Slika")]
        [Required()]
        public string slika {get; set;}

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Kategorija Kategorija {get;set;} 
        [JsonIgnore]
        public virtual Salon Salon {get;set;}  
        [JsonIgnore]
        public virtual List<KorpaProizvod> Korpe {get;set;} 
        #endregion ReferenceNaDrugeKlase
   }
}