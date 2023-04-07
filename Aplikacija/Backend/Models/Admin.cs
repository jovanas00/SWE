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
        public string Ime {get; set;}

        [Column("Prezime")]
        [MaxLength(20)]
        [Required()]
        public string Prezime {get; set;}
        #region ReferenceNaDrugeKlase
        public virtual Korisnik Korisnik { get; set; }
        
        #endregion ReferenceNaDrugeKlase
   }
}