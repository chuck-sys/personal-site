---
layout: post
title: "How to Obtain Cropped Nucleotide Sequences and More"
excerpt: "Using BioPerl, get subsets of a nucleotid sequence."
date: "2017-08-14 09:43"
category: bioperl
tags: [bioperl,perl,bioinformatics]
---

In my opinion, there isn't much documentation on the BioPerl site: just vague
examples and whatnot.

Say for instance you want to get the entire nucleotide sequence of a particular
organism, but it must be split up because you only want to deal with the
proteins, and not the entire organism. So less like this:

``` fasta
>NC_002695.1 Escherichia coli O157:H7 str. Sakai, complete genome
AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTCTCTGACAGCAGC
TTCTGAACTGGTTACCTGCCGTGAGTAAATTAAAATTTTATTGACTTAGGTCACTAAATACTTTAACCAA
TATAGGCATAGCGCACAGACAGATAAAAATTACAGAGTACACAACATCCATGAAACGCATTAGCACCACC
ATTACCACCACCATCACCACCACCATCACCATTACCATTACCACAGGTAACGGTGCGGGCTGACGCGTAC
AGGAAACACAGAAAAAAGCCCGCACCTGACAGTGCGGGCTTTTTTTTCGACCAAAGGTAACGAGGTAACA
ACCATGCGAGTGTTGAAGTTCGGCGGTACATCAGTGGCAAATGCAGAACGTTTTCTGCGGGTTGCCGATA
TTCTGGAAAGCAATGCCAGGCAGGGGCAGGTGGCCACCGTCCTCTCTGCCCCCGCCAAAATCACCAACCA
CCTGGTGGCGATGATTGAAAAAACCATTAGCGGCCAGGATGCTTTACCCAATATCAGCGATGCCGAACGT
ATTTTTGCCGAACTTCTGACGGGACTCGCCGCCGCCCAGCCGGGATTCCCGCTGGCGCAATTGAAAACTT
TCGTCGACCAGGAATTTGCCCAAATAAAACATGTCCTGCATGGCATTAGTTTGTTAGGGCAGTGCCCGGA
TAGCATTAACGCTGCGCTGATTTGCCGTGGCGAGAAAATGTCGATCGCCATTATGGCCGGCGTATTAGAA
GCGCGCGGTCACAACGTTACCGTTATCGATCCGGTCGAAAAACTGCTGGCAGTGGGGCATTACCTCGAAT
CTACTGTCGATATTGCAGAGTCCACCCGCCGTATTGCGGCAAGTCGTATTCCGGCTGATCACATGGTGCT
GATGGCAGGTTTCACCGCCGGTAATGAAAAAGGCGAACTGGTGGTACTTGGACGCAACGGTTCCGACTAC
TCCGCGGCGGTGCTGGCTGCCTGTTTACGCGCCGATTGTTGCGAGATTTGGACGGACGTTGACGGGGTAT
ATACCTGCGACCCGCGTCAGGTGCCCGATGCGAGGTTGTTGAAATCGATGTCCTACCAGGAAGCGATGGA
GCTTTCCTACTTCGGCGCTAAAGTTCTTCACCCCCGCACCATTACCCCCATCGCCCAGTTCCAGATCCCT
TGCCTGATTAAAAATACCGGAAATCCTCAAGCTCCAGGTACGCTCATTGGTGCCAGTCGTGATGAAGACG

...
```

And more like this:

``` fasta
>SDY_PA01
ATGTCTGAATTAGTTGTGTTTAAAGCAAATGAATTAGCAGTAAGCCGTTATGATCTAACTGAACATGAAA
CCAAGCTAATTCTGTTTTGCGTTGCAAAGTTGAACCCTACAATTGAAAACCCAACAAGGGATGAATTAAC
AGTTAAATTCTCATGTTCTGAATATGCACGCACTATGGGCTTAAGTTATGAAAATGCTTGGGGAAGATTG
AACAGTGCAACTAGTGATTTATTTAAACGCTCTGTTGAATTAATTTATCCTACAGGAGCAGTTTCTAAAC
GAATTTTCAATTGGACGGAATACGCTGAGTTCAATAGAGAAGAACAAACTGTAACATTAGTATTTAGCTC
ATATATTCAACCACTTTTATTTCATTTAAAAAAATTCATTAAATACAACCTTGAGCATGTTAAAGCCTTT
GAAAATAAATACTCAATGCGAATATATGAATGGTTACTAAAGGAGCTTTCACAAAGAAAAACGCATAGGG
GAAACATTGAGATAAGTATCAAGGAATTTAAGTTTATGCTCATGCTTGAAAAAAACTACCCTTTATATGC
AGAATTGAATCGCTGGATCCTAAAACCAGTTACAAATGACTTAAACACTTACAGCAATATGAAGTTGACT
ATTGAAAAACGCGGTCGTCCTGCTGACACACTGATCTTTCAAGTTGAACTGGATAAACAAATTGACCTTG
TGACTGAACTAGCAAAAGATCCCGCATCAAAAAAAGAAGATAAGACAATCCGTTTAACGCCTGAAAATCG
TCTTCATGAGGGGCTAAAAACAACATTGCATGATGCTTTAACTGCAAAAATTCAACTGACTAGTTTTGAA
GCAAAATTCCTGAGCGATATGCAAAGCAAGTACGATCTTAACGGCTCATTTACATGGCTGACTCAAAAGC
AACGAACTACGCTAGAGAAAATTCTGGCTAAATACGGGCGGATATGA
>SDY_PA02
GTGGCTTCTGTTTCTATCAACTGTCCCTCCTGTTCAGCTACTGACGGGGGGGTGCGTAACGGCAAAAGCA
CTGCCGGACATCAGCGCTATCTCTGCTCTCACTGCCGTAAAACATGGCAACTGCAGTTCACTTACACCGC
TTCTCAACCCGGTACGCACCAGAAAATCATTGATATGGCCATGAATGGCGTTGGATGCCGGGCAACTGCA
CGCATTATGGGCGTTAGCCTCAACACGATTTTACGTCACTTAAAAAACTCAGGCCGCAGTCGGTAA
>SDY_PA03
ATGGACGAACAGTGGGGATACGTCGGGGCTAAATCGCGCCAGCGCTGGCTGTTTTACGCGTATGACAGGC
TCCGGAAGACGGTTGTTGCGCACGTATTCGGTGAACGCACTATGGCGACGCTGGGGCGTCTTATGAGCCT
GCTGTCCCCCTTTGACGTGGTGATATGGATGACGGATGGCTGGCCGCTGTATGAATCCCGCCTGAAGGGA
AAGCTGCACGTAATCAGCAAGCGATATACGCAGCGAATTGAGCGGCATAACCTGAATCTGAGGCAGCACC
TGGCACGGCTGGGACGGAAGTCGCTGTCGTTCTCAAAATCGGTGGAGCTGCATGACAAAGTCATCGGGCA
TTATCTGAACATAAAACACTATCAATAA
```

As you may or may not notice, these are 2 completely different organisms, but
you get the drift.

## Pre-requisites

BioPerl must be installed, along with Perl.

## Disclaimer(s)

I don't do Perl. I don't like it that much, and I'm not very experienced in it.
I also don't do Biology.

## The Code

Start your file with the basics:

``` perl
#!/usr/bin/env perl
use strict;
use warnings;

# We'll be getting nucleotides from GenBank database (NCBI)
use Bio::DB::GenBank;
use Bio::DB::Query::GenBank;
```

To specify the specific sequence you want to get, BioPerl recommends creating
a query object.

``` perl
my $query = "NC_002695 [ACCN] OR NC_002127 [ACCN] OR NC_002128 [ACCN]";
my $query_obj = Bio::DB:Query::GenBank->new(-db =>    'nucleotide',
                                            -query => $query);
```

I will be using accesion numbers to get the specific sequences. Note that the
binary operators `OR` (other binary operators include `AND`) must be in
uppercase. For a complete list of query fields, see [this][qfields].

``` perl
# Start querying
my $gb = Bio::DB:GenBank->new;
my $seq_objs = $gb->get_Stream_by_query($query_obj);

# Iterate through all the sequences gotten
while (my $seq_obj = $seq_objs->next_seq) {
    # Iterate through all the features
    for my $feat_obj ($seq_obj->get_SeqFeatures) {
        # Only print features with primary tag "CDS", "protein_id", and
        # "locus_tag" (I'm not sure what "CDS" stands for)
        if ($feat_obj->primary_tag eq "CDS" and
            $feat_obj->has_tag("protein_id") and
            $feat_obj->has_tag("locus_tag")) {
                print ">", $feat_obj->get_tag_values("locus_tag"), "\n";
                print $feat_obj->spliced_seq->seq, "\n";
        }
    }
}
```

To explain the above code a bit more in depth, here is the raw text of a
GenBank file, copied straight off of the NCBI database, features only:

``` genbank
FEATURES             Location/Qualifiers
     source          1..5498450
                     /organism="Escherichia coli O157:H7 str. Sakai"
                     /mol_type="genomic DNA"
                     /strain="Sakai"
                     /sub_strain="RIMD 0509952"
                     /serovar="O157:H7"
                     /db_xref="taxon:386585"
     misc_feature    1..5498450
                     /note="REFSEQ gene predictions performed by GeneMark
                     2.4/GeneMark.hmm 2.0 with comparison to original submitter
                     provided annotation."
     gene            190..273
                     /gene="thrL"
                     /locus_tag="ECs0001"
                     /db_xref="GeneID:913387"
     CDS             190..273
                     /gene="thrL"
                     /locus_tag="ECs0001"
                     /note="involved in threonine biosynthesis; controls the
                     expression of the thrLABC operon"
                     /codon_start=1
                     /transl_table=11
                     /product="thr operon leader peptide"
                     /protein_id="NP_308028.1"
                     /db_xref="GeneID:913387"
     gene            354..2816
                     /gene="thrA"
                     /locus_tag="ECs0002"
                     /db_xref="GeneID:913388"
```

There seems to be only one method of distinguishing genes that are proteins
from genes that have nothing to do with the proteins: in the CDS, there is one
tag "protein_id" that only proteins have (it corresponds to the protein's
protein product). Genes that aren't proteins don't have this tag. Using this
"distinguishing" feature, I was able to filter out all the genes that aren't
proteins.

Our research heavily used the locus tag of proteins, but not the protein
product as much.


[qfields]: https://www.ncbi.nlm.nih.gov/entrez/query/static/help/Summary_Matrices.html#Search_Fields_and_Qualifiers
