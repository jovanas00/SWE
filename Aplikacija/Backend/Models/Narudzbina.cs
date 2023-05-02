namespace BackEnd.Models
{
    [Table("NARUDZBINA")]
    public class Narudzbina 
    {
        [Key()]
        [JsonIgnore]
        [Column("NarudzbinaID")]
        public int ID { get; set; }

        [Column("Status")]
        [Required()]
        public string status {get; set;}

        [Column("KomentarSalona")]
        [MaxLength(150)]
        [Required()]
        public string komentarSalona {get; set;}

        [Column("UkupnaCena")]
        [Required()]
        public float ukupnaCena {get; set;}

        [Column("Datum")]
        [Required()]
        public DateTime datum {get; set;}

        [Column("KorisnickoIme")]
        [Required()]
        public string korisnickoIme { get; set; }

        [Column("Grad")]
        public string grad { get; set; }
        
        [Column("Adresa")]
        public string adresa { get; set; }
        
        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual List<NaruceniProizvod> NaruceniProizvodi {get;set;} 
        [JsonIgnore]
        public virtual Korpa Korpa {get;set;} 
        [JsonIgnore]
        public virtual Klijent Klijent {get;set;}
        [JsonIgnore]
        public virtual Salon Salon {get;set;} 
        #endregion ReferenceNaDrugeKlase
   }
}