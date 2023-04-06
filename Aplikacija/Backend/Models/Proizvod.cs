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
<<<<<<< HEAD
=======
        //ogranicenje?---NEMA
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        [Required()]
        public float Cena {get; set;}

        [Column("Dostupnost")]
<<<<<<< HEAD
=======
        //ogranicenje?---NEMA
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        [Required()]
        public bool Dostupnost {get; set;}

        [Column("Slika")]
<<<<<<< HEAD
=======
        //tip i ogranicenje?---STRING,NEMA
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
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