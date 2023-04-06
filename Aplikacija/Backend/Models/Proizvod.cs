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
        public string Naziv {get; set;}

        [Column("Cena")]
        //ogranicenje?---NEMA
        [Required()]
        public float Cena {get; set;}

        [Column("Dostupnost")]
        //ogranicenje?---NEMA
        [Required()]
        public bool Dostupnost {get; set;}

        [Column("Slika")]
        //tip i ogranicenje?---STRING,NEMA
        [Required()]
        public string Slika {get; set;}

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