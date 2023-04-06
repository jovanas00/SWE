namespace BackEnd.Models
{
    [Table("ZAHTEV")]
    public class Zahtev 
    {
        [Key()]
        [JsonIgnore]
        [Column("ZahtevID")]
        public int ID { get; set; }

        [Column("ImeLjubimca")]
        [MaxLength(20)]
        [Required()]
        public string ImeLjubimca {get; set;}

        [Column("Zivotinja")]
        [MaxLength(20)]
        [Required()]
        public string Zivotinja { get; set; }

        [Column("Cena")]
<<<<<<< HEAD
=======
        //ogranicenje?---NEMA
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        [Required()]
        public float Cena { get; set; }

        [Column("DatumVreme")]
<<<<<<< HEAD
=======
        //ogranicenje?---NEMA
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        [Required()]
        public DateTime DatumVreme { get; set; }

        [Column("Status")]
<<<<<<< HEAD
=======
        //ogranicenje i tip?---NEMA,ENUM
>>>>>>> f075a7cd4bccdbf3ad6ef553ef86b7d22a4ea904
        [Required()]
        public string Status { get; set; }

        [Column("KomentarSalona")]
        [MaxLength(150)]
        [Required()]
        public string KomentarSalona { get; set; }

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;} 
        [JsonIgnore]
        public virtual List<Usluga> Usluge {get;set;}  
        #endregion ReferenceNaDrugeKlase
    }
}