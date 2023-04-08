namespace BackEnd.Models
{
    [Table("KATEGORIJA")]
    public class Kategorija 
    {
        [Key()]
        [JsonIgnore]
        [Column("KategorijaID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(20)]
        [Required()]
        public string naziv {get; set;}

        #region ReferenceNaDrugeKlase
        [JsonIgnore]
        public virtual List<Proizvod> Proizvodi {get;set;}  
        #endregion ReferenceNaDrugeKlase
   }
}