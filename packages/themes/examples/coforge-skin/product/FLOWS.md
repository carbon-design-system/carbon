# Luma user flows — joined (v1 depth + v2 chrome)

**Plan:** [`FLOW-JOIN.md`](FLOW-JOIN.md). **IA:** `IA.md`. **Use cases:**
`USE-CASES.md`.  
**P2 polish:**
[`Plans/prototype-agentic-2.md`](../../../../../../Plans/prototype-agentic-2.md)
· audit [`PROTOTYPE-2-AUDIT.md`](PROTOTYPE-2-AUDIT.md).  
Solid = in prototype. Dotted = later. Dashed to Out = anti-path. Concierge is a
**layer** (always on); Header returns to Home from each menu job.

```mermaid
flowchart TD
  start([Cold entry]) --> home["Home / · four JobDoors"]
  home --> tickets["Tickets /tickets"]
  home --> hotels["Hotels /hotels"]
  home --> acts["Activities /activities"]
  home --> itin["Itinerary /itinerary"]
  tickets --> home
  hotels --> home
  acts --> home
  itin --> home

  conc["ConciergeLayer — not a menu item"] -.-> tickets
  conc -.-> hotels
  conc -.-> acts
  conc -.-> itin
  conc -.-> air

  subgraph P09["P09 · ResearchGate — research is the gate"]
    hotels --> vSearch["Labelled Search"]
    vSearch --> vList["Shortlist"]
    vSearch --> vEmpty["Empty — specific, no Book"]
    vList --> vUnpub["Unpublished · Drop = success"]
    vList --> vMain["Mainstream AccessProtocol"]
    vList --> vSpec["Specialist AccessProtocol"]
    vMain --> vProto["Measures: door / hoist / photos"]
    vSpec --> vProto
    vProto --> vHow["How verified · W-01 protocol"]
    vProto -.-> vBook["Out: Book"]
    vProto -.-> vAssist["Later: assistance live"]
  end

  subgraph P14["P14 · DocumentPair — near-miss"]
    tickets --> tFlight["Flight already on itinerary"]
    tFlight --> auth["Form wall · stored docs only"]
    auth --> dPair["Outbound large · return second"]
    dPair --> dWrong["Wrong blocked · reselect"]
    dWrong --> dPair
    dPair --> dRight["Outbound confirmed"]
    dRight --> dRec["Recovery stub · ASSUMPTION"]
    tFlight -.-> tSell["Out: sell seat"]
  end

  subgraph P04["P04 · ItineraryShare — knowledge leaves his head"]
    itin --> pRead["Full itinerary"]
    pRead --> pShare["Copy URL + print"]
    pShare --> pRecip["The other 7 · no account"]
    itin --> air
  end

  subgraph P12["P12 · AirportSequence — sequence is the product"]
    tickets --> air["/airport · not in Header menu"]
    air --> aSeq["Places in the building"]
    aSeq --> aNeed["Documents I need"]
    aSeq --> aTsa["TSA link-out"]
    aSeq --> aPass["Passport vs immigration"]
    aSeq --> aGate["To the gate"]
    aSeq -.-> aAgency["Out: agency book"]
  end

  subgraph ACT["Activities · ASSUMPTION"]
    acts --> aList["Access-gated or itinerary stop"]
    aList -.-> aMkt["Out: marketplace Book"]
  end
```

Goals check: P09 still has search / empty / drop / dual inventory / how-verified
/ no Book. P14 still has wrong/right/recovery, now after auth, still no
checkout. P04 still has zero-adoption share. P12 still has the seam; only the
**entry** moved off the Header.
