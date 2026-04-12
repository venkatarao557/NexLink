using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexLink.Core.Entities;

[Table("Declaration")]
public partial class Declaration
{
    [Key]
    public Guid Id { get; set; }

    public string? EndorsementText { get; set; }
}
