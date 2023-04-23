namespace BackEnd.Models
{
    [Table("NARUCENI_PROIZVOD")]
    public class NaruceniProizvod
    {
        [Key()]
        [JsonIgnore]
        [Column("NaruceniProizvodID")]
        public int ID { get; set; }

        [Column("NazivProizvoda")]
        [MaxLength(30)]
        public string nazivProizvoda { get; set; }

        [Column("SlikaProizvoda")]
        public string slikaProizvoda { get; set; }

        [Required()]
        [Column("Kolicina")]
        public int kolicina { get; set; }

        public virtual Narudzbina Narudzbina {get;set;}  
    }
}