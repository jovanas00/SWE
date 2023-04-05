namespace BackEnd.Models
{
    [Table("ADMIN")]
    public class Admin //: Korisnik
    {
        [Key()]
        [JsonIgnore]
        [Column("AdminID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(20)]
        [Required()] //atribut Required() i 
                     //requred posle public nemaju veze jedno s drugim
        public required string Ime {get; set;} //ovo requred nam sklanja warnings kad je nullable enable
                                                //kad nesto moze null da bude onda samo u nastavku =null! ili ? posle tipa

        [Column("Prezime")]
        [MaxLength(20)]
        [Required()]
        public required string Prezime {get; set;}
   }
}