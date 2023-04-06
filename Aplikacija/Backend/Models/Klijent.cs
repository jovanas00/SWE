namespace BackEnd.Models
{
    [Table("KLIJENT")]
    public class Klijent 
    {
        [Key()]
        [JsonIgnore]
        [Column("KlijentID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(20)]
        [Required()]
        public string Ime {get; set;}

        [Column("Prezime")]
        [MaxLength(20)]
        [Required()]
        public string Prezime {get; set;}

        [Column("Adresa")]
        [MaxLength(20)]
        [Required()]
        public string Adresa { get; set; }

        [Column("Grad")]
        [MaxLength(20)]
        [Required()]
        public string Grad { get; set; }

        [Column("BrojTelefona")]
        [MaxLength(13)]
        [Required()]
        public string BrojTelefona { get; set; }

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual Korpa Korpa {get;set;}  
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