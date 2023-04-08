namespace BackEnd.Models
{
    [Table("ADMIN")]
    public class Admin
    {
        [Key()]
        [JsonIgnore]
        [Column("AdminID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(20)]
        [Required()]
        public string ime {get; set;}

        [Column("Prezime")]
        [MaxLength(20)]
        [Required()]
        public string prezime {get; set;}
        #region ReferenceNaDrugeKlase
        public virtual Korisnik Korisnik { get; set; }
        
        #endregion ReferenceNaDrugeKlase
   }
}