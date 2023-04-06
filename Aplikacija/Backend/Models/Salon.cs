namespace BackEnd.Models
{
    [Table("SALON")]
    public class Salon
    {
        [Key()]
        [JsonIgnore]
        [Column("SalonID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(20)]
        [Required()]
        public string Naziv {get; set;}

        [Column("Adresa")]
        [MaxLength(20)]
        [Required()]
        public string Adresa { get; set; }

        [Column("Grad")]
        [MaxLength(20)]
        [Required()]
        public string Grad { get; set; }

        [Column("ProsecnaOcena")]
        [Required()]
        public float ProsecnaOcena { get; set; }

        [Column("BrojTelefona")]
        [MaxLength(13)]
        [Required()] 
        public string BrojTelefona { get; set; }

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual List<Usluga> Usluge {get;set;}  
        [JsonIgnore]
        public virtual List<Proizvod> Proizvodi {get;set;} 
        [JsonIgnore]
        public virtual List<Recenzija> Recenzije {get;set;} 
        [JsonIgnore]
        public virtual List<Pitanje> Pitanja {get;set;} 
        [JsonIgnore]
        public virtual List<Zahtev> Zahtevi {get;set;}
        [JsonIgnore]
        public virtual List<Narudzbina> Narudzbine {get;set;}  
        #endregion ReferenceNaDrugeKlase
   }
}